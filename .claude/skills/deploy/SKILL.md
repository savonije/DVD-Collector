---
name: deploy
description: >-
    Use when the user wants to release / deploy the app to production (e.g. "deploy to
    prod", "ship a release", "cut a new version", "/deploy"). Runs the full production
    release flow: bump the semver, create and push a git tag, publish a GitHub release
    with a written summary of the changes, build, and deploy to Firebase Hosting. Do NOT
    trigger for `npm run dev`, preview builds, or non-production work.
---

# Deploy to production

Release flow for this app: **bump version → tag → GitHub release → build → `firebase deploy`**.
Follow the phases in order. Stop and report if any step fails — never continue a release
on top of a failed step.

## Facts (don't re-derive)

- Version is tracked in `package.json` (`version` field).
- **This repo switched from CalVer to semver at `2.0.0`.** Every tag before that is CalVer
  with no prefix (`2025.1` … `2026.2`); from `2.0.0` on, tags are `vX.Y.Z` — `npm version`
  adds the `v` itself. So `v2.0.0` is the first `v`-prefixed tag in a history of
  unprefixed ones, and `git tag`/`git describe` output looks mixed for one release. That
  is expected, not a mistake to fix.
- **The version field used to drift behind the tags** — `2026.2` was tagged without
  bumping `package.json`, so `__APP_VERSION__` (a Vite define from `npm_package_version`)
  shipped a release behind. Always let `npm version` do the bump so the two stay in sync,
  and check them in preflight.
- Production is **Firebase Hosting**, serving the `dist/` folder (see `firebase.json`).
  The project ID is **`dvds-b32d4`**. `firebase` CLI is installed at
  `/usr/local/bin/firebase`.
- **`.firebaserc` is gitignored and normally absent**, so there is no active project and a
  bare `firebase deploy` fails with `Error: No active project`. Always pass
  `--project dvds-b32d4`.
- The repo builds with `npm run build` (runs `type-check` + `vite build` into `dist/`).
- Remote is `origin` → `github.com/savonije/DVD-Collector`.
- Production releases go out from the **`main`** branch.
- The `Deploy to Firebase Hosting on merge` / `on PR` workflows exist but are
  **disabled** (`disabled_manually`) — which is why this deploy is manual. If they are
  ever re-enabled, the Phase 3 push deploys to live on its own and Phase 4 becomes a
  second deploy; check `gh workflow list` if the deploy behaves unexpectedly.
- CI that *is* active: `Prettier Check`, `TypeScript Check`, `Build & Test`. There is no
  test framework in this project.

## Phase 1 — Preflight (verify before touching anything)

Run these and confirm each before proceeding:

1. **Clean tree** — `git status --porcelain` must be empty. `npm version` refuses to run
   with uncommitted changes; don't `--force` past it. If dirty, stop and ask the user.
2. **On `main` and synced** — `git branch --show-current` should be `main`, and
   `git fetch && git status` should show up to date with `origin/main`. If the user is on
   a feature branch (e.g. mid-refactor), confirm with them whether to merge to `main`
   first or deploy from the current branch. Don't assume.
3. **Version matches the newest tag** — compare `package.json`'s version against
   `git describe --tags --abbrev=0`. They should be the same release (modulo the `v`).
   If the version is behind, an earlier release skipped the bump; say so, and let this
   release's `npm version` bring them back in line.
4. **CI is green on `main`** — this repo has been red on `Prettier Check` before, and the
   skill must not tag a release on top of that:

    ```bash
    npm run prettier:check     # if it fails: npm run format, then commit
    gh run list --branch main --limit 5
    ```

    A failing check is not a reason to stop the release on your own — report it and ask,
    unless it's a formatting-only failure the user has already told you to fix.

5. **Firebase auth** — `firebase projects:list` should succeed (i.e. logged in). If not,
   tell the user to run `! firebase login` in the prompt.
6. **GitHub auth** — `gh auth status` should succeed. If not, tell the user to run
   `! gh auth login` in the prompt (interactive; can't be done for them).
7. **Show what's shipping** — and capture the current tag as the release-notes baseline:

    ```bash
    git describe --tags --abbrev=0                                # e.g. 2026.2
    git log $(git describe --tags --abbrev=0)..HEAD --oneline
    ```

    Show the user that commit list. **Write the tag down** (e.g. `2026.2`) and paste it
    literally into the Phase 3 commands — shell variables don't survive between Bash
    calls, and after Phase 2 `git describe` returns the _new_ tag, not this one.

## Phase 2 — Bump the version

Ask the user (or read from the skill args) which bump to apply, following semver:

- `patch` — bug fixes only (e.g. `2.1.0` → `2.1.1`)
- `minor` — new backwards-compatible features (`2.1.0` → `2.2.0`)
- `major` — breaking changes (`2.1.0` → `3.0.0`)

Then run:

```bash
npm version <patch|minor|major> -m "chore(release): %s"
```

This bumps `package.json`, creates a release commit, and creates the `vX.Y.Z` tag in one
step. Capture the new version string (e.g. `v2.1.0`) — you'll reuse it below.

> **One-time exception — a non-semver version in `package.json`.** The keyword form only
> works if the current version is valid semver. While `package.json` still holds a CalVer
> version like `2026.1`, `npm version major` fails with `npm error Invalid version: major`
> (npm can't increment what it can't parse). Pass the version explicitly instead:
>
> ```bash
> npm version 2.0.0 -m "chore(release): %s"
> ```
>
> That sets `2.0.0` and creates the `v2.0.0` tag. Once the field is semver, use the
> keyword form for every later release.

## Phase 3 — Push commit + tag, then publish the GitHub release

```bash
git push --follow-tags        # pushes the release commit AND the new tag
```

### 3a. Read the changes properly

Dependency updates land here as Dependabot PRs, so `--generate-notes` does produce PR
lines — but they are all dependency noise, and the changes users actually care about are
committed straight to `main` with no PR to title them. That is why the summary is written
by hand and the generated list is kept only as the tail of the release body.

Start from the full commit messages — bodies included, not just subjects — between the
previous tag (captured in Phase 1) and the release:

```bash
git log <PREV_TAG>..HEAD --pretty=format:'%h %s%n%b%n---'
```

If a subject is too terse to explain the user-visible effect (`fix: sort order`), look at
the actual change before writing about it — don't guess:

```bash
git show --stat <sha>
```

### 3b. Write the notes

Write to a `release-notes.md` in your scratchpad directory. Rules:

- **Describe the effect, not the commit.** `fix: filter out titles without a rating`
  becomes "Titles without a rating no longer disappear from the collection." Never paste
  raw conventional-commit subjects as bullets.
- **English**, matching the commit convention and the app's own UI language.
- **Group under `###` headings, and only include headings that have content:**
    - `### New` — `feat:`
    - `### Fixes` — `fix:`
    - `### Changes` — user-visible behaviour that changed or was removed, which is neither
      a new feature nor a bug fix
    - `### Under the hood` — `refactor:`, `perf:`, `build:`, `ci:`, `test:`, `docs:`,
      and dependency bumps that users would never notice
- **The commit prefix is a hint, not the rule — the actual effect decides the section.**
  `chore: remove runtime from the detail page` deleted a field users could see: that is
  `### Changes`, not `### Under the hood`. Check the diff whenever the prefix and the
  subject disagree about how visible a change is.
- **One line per change**, no trailing period pile-up, no essays. If a section would run
  past ~8 bullets, merge related commits into one bullet instead of listing each.
- **Skip pure noise**: the `chore(release):` commit itself, merge commits, formatting-only
  passes. A release that is nothing but dependency bumps is allowed to be a single
  `### Under the hood` bullet — say so plainly rather than padding it.
- **Don't invent anything** that isn't in the commits — no speculative "improved
  performance" claims.
- For a `minor`/`major` release, open with one plain sentence framing the release before
  the first heading. A `patch` can go straight to the bullets.

Use the app's own vocabulary: titles, the collection, ratings, genres, filtering and
sorting, the detail page, dark mode, login.

<details>
<summary>Example for a patch release</summary>

```markdown
### Fixes

- Titles without a rating no longer disappear from the collection.
- Sorting by year now puts the newest titles first instead of reversing the list.

### Under the hood

- Split the title detail page into smaller components.
```

</details>

### 3c. Publish

```bash
gh release create <vX.Y.Z> --title "<vX.Y.Z>" \
  --notes-file <scratchpad>/release-notes.md \
  --generate-notes
```

Keep **both** flags. GitHub prepends the `--notes-file` content to the generated notes, so
the release page shows the written summary on top and still gets the
`**Full Changelog**: …compare/<PREV_TAG>...<vX.Y.Z>` link at the bottom (verified
behaviour, not an assumption). Passing `--title` explicitly stops `--generate-notes` from
overriding it.

The command prints the release URL — capture it for the final report.

### Amending notes on an already-published release

```bash
gh release edit <vX.Y.Z> --notes-file <scratchpad>/release-notes.md
```

Two differences from `create`, both easy to get wrong:

- `edit` **replaces the whole body** — it doesn't merge with what's there.
- `edit` has **no `--generate-notes` flag**, so the compare link is not re-added for you.

So before amending, append the link to the notes file yourself, or you'll silently drop it:

```markdown
**Full Changelog**: https://github.com/savonije/DVD-Collector/compare/<PREV_TAG>...<vX.Y.Z>
```

## Phase 4 — Build and deploy

```bash
npm run build                          # type-check + vite build → dist/. If this fails, STOP.
firebase deploy --project dvds-b32d4   # deploys dist/ to Firebase Hosting
```

`--project` is not optional here — `.firebaserc` is gitignored, so without it the CLI
stops at `Error: No active project`.

If `npm run build` fails **after** the tag/release were already created, don't leave prod
half-shipped: report the failure, and note that the tag/release exist but nothing was
deployed. Fix forward with a follow-up patch release rather than deleting the tag, unless
the user explicitly asks to roll it back.

## Done

Report: the new version, the pushed tag, the GitHub release URL, the Firebase Hosting URL
from the `firebase deploy` output, and the release notes you published (so the user can
spot a wording fix without opening GitHub — amend with `gh release edit`).
