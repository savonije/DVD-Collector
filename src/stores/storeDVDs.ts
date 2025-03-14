import {
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    orderBy,
    query,
    setDoc,
    updateDoc,
} from 'firebase/firestore';
import { defineStore } from 'pinia';

import { db } from '@/firebase';
import type { Movie } from '@/types';

const collectionRef = collection(db, import.meta.env.VITE_FIREBASE_DB_NAME);
const collectionQuery = query(collectionRef, orderBy('name', 'asc'));

export const useStoreDVDs = defineStore('storeDVDs', {
    state: (): { DVDs: Movie[]; DVDsLoaded: boolean } => {
        return { DVDs: [], DVDsLoaded: false };
    },
    actions: {
        getDVDs() {
            onSnapshot(collectionQuery, (querySnapshot) => {
                this.DVDsLoaded = false;

                this.DVDs = querySnapshot.docs.map((doc) => ({
                    actors: doc.data().actors,
                    awards: doc.data().awards,
                    director: doc.data().director,
                    genre: doc.data().genre,
                    id: doc.id,
                    imdbID: doc.data().imdbID,
                    imdbRating: doc.data().imdbRating,
                    metascore: doc.data().metascore,
                    name: doc.data().name,
                    plot: doc.data().plot,
                    poster: doc.data().poster || '',
                    rated: doc.data().rated,
                    rating: Number(doc.data().rating) || 0,
                    runtime: doc.data().runtime,
                    year: doc.data().year,
                }));

                this.DVDsLoaded = true;
            });
        },
        addDVD(movie: Movie) {
            setDoc(
                doc(db, import.meta.env.VITE_FIREBASE_DB_NAME, movie.id),
                movie,
            );
        },
        deleteDVD(id: string) {
            deleteDoc(doc(collectionRef, id));
        },
        updateDVD(id: string, name: string, rating?: number) {
            const updateData: { name: string; rating?: number } = { name };
            if (rating !== undefined) {
                updateData.rating = rating;
            }
            updateDoc(
                doc(db, import.meta.env.VITE_FIREBASE_DB_NAME, id),
                updateData,
            );
        },
    },
});
