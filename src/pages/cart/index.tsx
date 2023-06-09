import QuantityButton from '@/components/QuantityButton'
import { ICartProductItem } from '@/interface/product'
import useInitializeStore from '@/store/auth'
import { useCartStore } from '@/store/cart'
import { numberFormat } from '@/utils/format'
import { ShoppingCart, XCircle } from 'lucide-react'
import Image from 'next/image'
import router from 'next/router'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

type Props = {}

type IPrice = {
  subTotal: number
  shipping: number
  tax: number
  orderTotal: number
}

const CartPage = (props: Props) => {
  const { cartList: cartStore, setCartList: setCartStore } = useCartStore()
  const { isLogin } = useInitializeStore()

  const [cartList, setCartList] = useState<ICartProductItem[]>([])
  const [sumPrice, setSumPrice] = useState<IPrice>({
    subTotal: 0,
    shipping: 0,
    tax: 0,
    orderTotal: 0,
  })
  const [isAuth, setIsAuth] = useState(false)

  const onSetAmount = (amount: number, i: number) => {
    const cart = [...cartList]
    cart[i].amount = amount
    setCartList(cart)
  }

  const onSetRemoveItem = (i: number) => {
    const cart = [...cartList]
    cart.splice(i, 1)
    setCartList(cart)
  }

  const onUpdateCart = () => {
    setCartStore(cartList)
    Swal.fire({
      icon: 'success',
      title: '',
      text: 'Update Cart Successfully',
    })
  }

  const onCheckout = () => {
    Swal.fire({
      icon: 'info',
      title: 'Confirm to checkout ?',
      text: 'are you sure you want to confirm checkout ?',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'successfully',
          'Your payment has been successfully submitted. We’ve sent you an email with all of the details of your order',
          'success'
        ).then(() => {
          router.push('/')
          setCartStore([])
        })
      }
    })
  }

  useEffect(() => {
    setCartList(cartStore)
  }, [cartStore])

  useEffect(() => {
    setIsAuth(isLogin)
  }, [isLogin])

  useEffect(() => {
    if (isAuth) {
      const subTotal = cartList.reduce(
        (acc, cur) => (acc += cur.amount * cur.price),
        0
      )
      const shipping = cartList.length ? Math.floor(Math.random() * 100) : 0
      const tax = cartList.length ? Math.floor(Math.random() * 10) : 0
      setSumPrice({
        subTotal,
        shipping,
        tax,
        orderTotal: subTotal + shipping + (subTotal * tax) / 100,
      })
    }
  }, [cartList,isAuth])

  return (
    <div className='w-[90%] max-w-[1400px] m-auto my-[40px]'>
      <h2 className='text-[32px] font-[600]'>Shopping Cart</h2>
      <div className='flex w-full mt-[20px] flex-wrap'>
        <div className='lg:w-[75%] md:pr-[30px] w-[100%]'>
          {cartList.length && isAuth ? (
            <div>
              <div className='hidden w-full gap-[16px] font-[600] md:flex'>
                <div className='w-[45%]'>Item</div>
                <div className='w-[15%] text-end'>Price</div>
                <div className='w-[20%] text-center'>Qty</div>
                <div className='w-[15%] text-end'>Subtotal</div>
                <div className='w-[5%]'></div>
              </div>
              {cartList.map((item, index) => {
                return (
                  <div className='border-b' key={`cart-${index}`}>
                    <div className='flex w-full gap-[16px]'>
                      <div className='w-[90%] md:w-[45%]'>
                        <div className='flex gap-[30px] py-[25px] pr-[10px] max-w-[500px]'>
                          <Image
                            src={item.thumbnail}
                            width={100}
                            height={100}
                            alt={item.title}
                            className='aspect-square object-cover object-center'
                          />
                          <div>
                            {item.brand} : {item.title}
                          </div>
                        </div>
                      </div>
                      <div className='w-[10%] block md:hidden'>
                        <div className='py-[25px] px-[10px] font-[600] text-end'>
                          <XCircle
                            className='text-[#A2A6B0]'
                            role='button'
                            onClick={() => onSetRemoveItem(index)}
                          />
                        </div>
                      </div>
                      <div className='w-[15%] hidden md:block'>
                        <div className='py-[25px] px-[10px] text-end font-[600]'>
                          $
                          {numberFormat(
                            item.price +
                              (item.price * item.discountPercentage) / 100
                          )}
                        </div>
                      </div>
                      <div className='w-[20%] hidden md:block'>
                        <div className='py-[25px] px-[10px] max-w-[140px] m-auto'>
                          <QuantityButton
                            amount={item.amount}
                            setAmount={(x) => {
                              onSetAmount(x, index)
                            }}
                            max={item.stock}
                          />
                        </div>
                      </div>
                      <div className='w-[15%] hidden md:block'>
                        <div className='py-[25px] px-[10px] font-[600] text-end'>
                          ${numberFormat(item.amount * item.price)}
                        </div>
                      </div>
                      <div className='w-[5%] hidden md:block'>
                        <div className='py-[25px] px-[10px] font-[600] text-end'>
                          <XCircle
                            className='text-[#A2A6B0]'
                            role='button'
                            onClick={() => onSetRemoveItem(index)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className='block md:hidden pb-[20px]'>
                      <div className='flex items-center mt-[30px] justify-between'>
                        <div className='w-[140px] text-[#A2A6B0]'>Price</div>
                        <div className=''>
                          $
                          {numberFormat(
                            item.price +
                              (item.price * item.discountPercentage) / 100
                          )}
                        </div>
                      </div>
                      <div className='flex items-center mt-[30px] justify-between'>
                        <div className='w-[140px] text-[#A2A6B0]'>Qty</div>
                        <div className=''>
                          <div className='w-fit'>
                            <QuantityButton
                              amount={item.amount}
                              setAmount={(x) => {
                                onSetAmount(x, index)
                              }}
                              max={item.stock}
                            />
                          </div>
                        </div>
                      </div>
                      <div className='flex items-center mt-[30px] justify-between'>
                        <div className='w-[140px] text-[#A2A6B0]'>Subtotal</div>
                        <div className=''>
                          ${numberFormat(item.amount * item.price)}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
              <div className='flex justify-end mt-[20px]'>
                <button
                  onClick={onUpdateCart}
                  type='button'
                  className='w-[200px] rounded-[60px] px-3 py-2 text-sm text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'
                >
                  Update Cart
                </button>
              </div>
            </div>
          ) : (
            <div className='flex justify-center items-center h-[400px] text-[#ACACAC] flex-col gap-[10px]'>
              <ShoppingCart className='w-[60px] h-[60px]' />
              <div>No Cart</div>
            </div>
          )}
        </div>
        <div className='lg:w-[25%] bg-[#F5F7FF] p-[30px] w-[100%]'>
          <h2 className='text-[28px]'>Summary</h2>
          <hr className='my-[20px]' />
          <div className='flex justify-between font-[600] items-end'>
            <div>Subtotal</div>
            <div>${numberFormat(sumPrice.subTotal)}</div>
          </div>
          <div className='flex justify-between mt-[30px] font-[600] items-end'>
            <div>Shipping</div>
            <div>${numberFormat(sumPrice.shipping)}</div>
          </div>
          <div className='flex justify-between mt-[30px] font-[600] items-end'>
            <div>Tax</div>
            <div>${numberFormat(sumPrice.tax)}</div>
          </div>
          <div className='flex justify-between mt-[30px] font-[600] items-end'>
            <div>Order Total</div>
            <div className='text-[20px]'>
              ${numberFormat(sumPrice.orderTotal)}
            </div>
          </div>
          <hr className='my-[20px]' />
          <button
            disabled={!cartList.length || !isAuth}
            onClick={onCheckout}
            type='button'
            className='w-full rounded-[60px] px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:bg-blue-200'
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartPage
