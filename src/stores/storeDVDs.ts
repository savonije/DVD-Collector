import { defineStore } from 'pinia'
import { db } from '@/firebase'
import { addDoc, collection, onSnapshot } from 'firebase/firestore'

const collectionRef = collection(db, 'dvds')

export const useStoreDVDs = defineStore('storeDVDs', {
  state: () => {
    return { DVDs: [] }
  },
  actions: {
    getDVDs() {
      onSnapshot(collectionRef, (querySnapshot) => {
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
      })
    },
    addDVD(name: string, rating: number) {
      const parseRating = parseInt(rating)

      addDoc(collectionRef, {
        name: name,
        rating: parseRating
      })
    }
  }
})
