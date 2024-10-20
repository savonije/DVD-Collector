import { defineStore } from 'pinia'
import { auth } from '@/firebase'
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'

export const useStoreAuth = defineStore('storeAuth', {
  state: (): { user: { id: string; email: string | null } | null } => {
    return {
      user: null
    }
  },
  actions: {
    init() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user = {
            id: user.uid,
            email: user.email
          }

          this.router.push('/')
        } else {
          this.user = null

          this.router.replace('/login')
        }
      })
    },
    loginUser(credentials: { email: string; password: string }) {
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
          console.log('Logout error ' + error)
        })
    }
  }
})
