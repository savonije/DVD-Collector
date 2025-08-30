export const initializeApp = () => ({
    name: 'mock-app',
});

export const getAuth = () => ({
    currentUser: null,
    signInWithEmailAndPassword: async () => ({ user: { uid: 'test-uid' } }),
    signOut: async () => {},
});
