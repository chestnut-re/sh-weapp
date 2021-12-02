import React from 'react'
import { useLocalObservable } from 'mobx-react-lite'
import { createUserStore } from './userStore'
import { createCommonStore } from './commonStore'

export const StoreContext = React.createContext(null)

// eslint-disable-next-line import/no-mutable-exports
let userStore: any = {}
// eslint-disable-next-line import/no-mutable-exports
let commonStore: any = {}

export { userStore, commonStore }

export const useStore = () => {
  const store = React.useContext<any>(StoreContext)
  if (!store) {
    // this is especially useful in TypeScript so you don't need to be checking for null all the time
    throw new Error('You have forgot to use StoreProvider, shame on you.')
  }
  return store
}

export function Provider({ children }) {
  userStore = useLocalObservable(createUserStore)
  commonStore = useLocalObservable(createCommonStore)

  const store = {
    userStore,
    commonStore,
  }

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}
