import { deleteCookie, hasCookie, setCookie } from 'cookies-next'
import Router from 'next/router'
import { create } from 'zustand'

type LoginData = {
  accessToken?: string
}

export type AuthStore = {
  isLogin: boolean
  login: (data: LoginData) => void
  logout: () => void
}

const initialState = {
  isLogin: hasCookie('access_token'),
}

export const useInitializeStore = create<AuthStore>((set) => ({
  ...initialState,
  login: ({ accessToken }) => {
    setCookie('access_token', accessToken)
    set({ isLogin: true })
    void Router.push('/')
  },
  logout: () => {
    deleteCookie('access_token')
    set({ isLogin: false })
    void Router.push('/')
  },
}))

export default useInitializeStore
