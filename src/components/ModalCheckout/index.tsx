import { numberFormat } from '@/utils/format'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { useModalCheckoutStore } from './ModalCheckout.store'

type IPrice = {
  subTotal: number
  shipping: number
  tax: number
  orderTotal: number
}

type Props = {
  subTotal: number
}

const ModalCheckout = ({ subTotal }: Props) => {
  const { open, onClose } = useModalCheckoutStore()

  const [sumPrice, setSumPrice] = useState<IPrice>({
    subTotal: 0,
    shipping: 0,
    tax: 0,
    orderTotal: 0,
  })

  const onCheckout = () => {
    Swal.fire({
      icon: 'success',
      title: 'successfully',
      text: 'Your payment has been successfully submitted. We’ve sent you an email with all of the details of your order',
    })
    onClose()
  }

  useEffect(() => {
    const shipping = Math.floor(Math.random() * 100)
    const tax = Math.floor(Math.random() * 10)
    setSumPrice({
      subTotal,
      shipping,
      tax,
      orderTotal: subTotal + shipping + (subTotal * tax) / 100,
    })
  }, [subTotal])

  return (
    <>
      <Transition appear show={open} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title
                    as='h3'
                    className='text-lg font-medium leading-6 text-gray-900'
                  >
                    Payment Order
                  </Dialog.Title>
                  <div className='mt-[20px] bg-[#F5F7FF] p-[30px] w-full rounded-lg'>
                    <h2 className='text-[28px]'>Summary</h2>
                    <hr className='my-[20px]' />
                    <div className='flex justify-between font-[600] items-end'>
                      <div>Subtotal</div>
                      <div>${numberFormat(subTotal)}</div>
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
                      onClick={onCheckout}
                      type='button'
                      className='w-full rounded-[60px] px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default ModalCheckout
