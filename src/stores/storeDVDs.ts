import { defineStore } from 'pinia'
import { db } from '@/firebase'
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query } from 'firebase/firestore'

const collectionRef = collection(db, import.meta.env.VITE_FIREBASE_DB_NAME)
const collectionQuery = query(collectionRef, orderBy('name', 'asc'))

export const useStoreDVDs = defineStore('storeDVDs', {
  state: () => {
    return { DVDs: [], DVDsLoaded: false }
  },
  actions: {
    getDVDs() {
      onSnapshot(collectionQuery, (querySnapshot) => {
        this.DVDsLoaded = false
        let dvdsArray = []
        querySnapshot.forEach((doc) => {
          const dvds = {
            id: doc.id,
            name: doc.data().name,
            rating: doc.data().rating
          }

          dvdsArray.push(dvds)
        })

        this.DVDs = dvdsArray

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
    }
  }
})
