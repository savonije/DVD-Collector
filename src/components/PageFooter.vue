<script lang="ts" setup>
    const version = __APP_VERSION__;
</script>

<template>
    <footer
        class="text-shark-500 dark:text-shark-200 mt-9 bg-black py-3 dark:bg-gray-950"
    >
        <div class="container flex justify-between text-xs">
            <div>Movie database - {{ version }}</div>
            <div class="text-right">
                <a href="https://github.com/savonije" target="_blank">
                    &copy; Kevin Savonije
                </a>
            </div>
        </div>
    </footer>
</template>
