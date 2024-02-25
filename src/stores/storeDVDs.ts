import { defineStore } from 'pinia'
import { db } from '@/firebase'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  limit,
  onSnapshot,
  orderBy,
  query
} from 'firebase/firestore'

const collectionRef = collection(db, 'dvds')
const collectionQuery = query(collectionRef, orderBy('name', 'asc'))

export const useStoreDVDs = defineStore('storeDVDs', {
  state: () => {
    return { DVDs: [] }
  },
  actions: {
    getDVDs() {
      onSnapshot(collectionQuery, (querySnapshot) => {
        const dvdsArray = []
        querySnapshot.forEach((doc) => {
          const dvds = {
            id: doc.id,
            name: doc.data().name,
            rating: doc.data().rating
          }

          dvdsArray.push(dvds)
        })

        this.DVDs = dvdsArray
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
