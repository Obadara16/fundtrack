import React, { useState, createContext, useContext } from 'react'

const authContext = createContext()

export function useAuth() {
  const [authed, setAuthed] = useState(false)

  //   check that the user is logged or token hasn't expired or something here.
  return {
    authed,
    login() {
      // get the auth to true
      return new Promise((res) => {
        let storage = window.localStorage.getItem('__xTFTGweTHDeRTT__%')
        console.log(`Storage : ${storage}`)
        if (storage) setAuthed(true)
        else setAuthed(false)
        res()
      })
    },

    logout() {

      window.localStorage.removeItem('__xTFTGweTHDeRTT__%');
      // set the auth to false
      // and redirect to login screen
      return new Promise((res) => {
        setAuthed(false)
        res()
      })
    },
  }
}

export function AuthProvider({ children }) {
  const auth = useAuth()
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export default function AuthConsumer() {
  return useContext(authContext)
}
