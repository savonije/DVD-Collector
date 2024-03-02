import { defineStore } from 'pinia'
import { db } from '@/firebase'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc
} from 'firebase/firestore'
import type { Movie } from '@/types'

const collectionRef = collection(db, import.meta.env.VITE_FIREBASE_DB_NAME)
const collectionQuery = query(collectionRef, orderBy('name', 'asc'))

export const useStoreDVDs = defineStore('storeDVDs', {
  state: (): { DVDs: Movie[]; DVDsLoaded: boolean } => {
    return { DVDs: [], DVDsLoaded: false }
  },
  actions: {
    getDVDs() {
      onSnapshot(collectionQuery, (querySnapshot) => {
        this.DVDsLoaded = false

        this.DVDs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          rating: doc.data().rating
        }))

        this.DVDsLoaded = true
      })
    },
    addDVD(name: string, rating: number) {
      addDoc(collectionRef, {
        name: name,
        rating: rating
      })
    },
    deleteDVD(id: string) {
      deleteDoc(doc(collectionRef, id))
    },
    updateDVD(id: string, name: string) {
      updateDoc(doc(db, import.meta.env.VITE_FIREBASE_DB_NAME, id), {
        name: name
      })
    }
  }
})
