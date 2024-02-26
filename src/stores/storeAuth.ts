import { defineStore } from 'pinia'
import { auth } from '@/firebase'
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'

export const useStoreAuth = defineStore('storeAuth', {
  state: () => {
    return {
      user: {}
    }
  },
  actions: {
    init() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user.id = user.uid
          this.user.email = user.email

          this.router.push('/')
        } else {
          this.user = {}

          this.router.replace('/login')
        }
      })
    },
    loginUser(credentials) {
      signInWithEmailAndPassword(auth, credentials.email, credentials.password)
        .then((userCredential) => {
          const user = userCredential.user
        })
        .catch((error) => {
          console.log(error.message)
        })
    },
    logoutUser() {
      signOut(auth)
        .then(() => {
          console.log('Logout user')
        })
        .catch((error) => {
          console.log('Logout error')
        })
    }
  }
})
