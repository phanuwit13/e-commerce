import { ICartProductItem } from '@/interface/product'
import { getCookie, setCookie } from 'cookies-next'
import { create } from 'zustand'

type UseCartStore = {
  cartList: ICartProductItem[]
  setCartList: (item: ICartProductItem[]) => void
  clearCartList: () => void
}
const setCartLocal = (item: ICartProductItem[]) => {
  setCookie('cart', JSON.stringify(item))
}
const getCartLocal = () => {
  const cart = getCookie('cart') as string
  if(cart){
    const result = JSON.parse(cart) as ICartProductItem[]
    return result
  }
  return []
}

const initialState = {
  // cartList: hasCookie('ACCESS_TOKEN') ? getCartLocal() : [],
  cartList: getCartLocal(),
}

export const useCartStore = create<UseCartStore>((set) => ({
  ...initialState,
  setCartList: (item) => {
    setCartLocal(item)
    set({ cartList: item })
  },
  clearCartList: () => set({ cartList: [] }),
}))
