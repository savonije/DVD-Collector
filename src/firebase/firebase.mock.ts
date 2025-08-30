import type { Auth } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';

export const db = {
    collection: () => ({
        doc: () => ({
            get: async () => ({ exists: false }),
        }),
    }),
} as unknown as Firestore;

export const auth = {
    currentUser: null,
    signInWithEmailAndPassword: async () => ({ user: { uid: 'test-user' } }),
    signOut: async () => {},
} as unknown as Auth;
