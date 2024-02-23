import { defineStore } from 'pinia'
import { db } from '@/firebase'
import { collection, onSnapshot } from 'firebase/firestore'

export const useStoreDVDs = defineStore('storeDVDs', {
  state: () => {
    return { DVDs: [] }
  },
  actions: {
    getDVDs() {
      onSnapshot(collection(db, 'dvds'), (querySnapshot) => {
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
    }
  }
})
