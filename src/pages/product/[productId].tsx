import ModalCheckout from '@/components/ModalCheckout'
import useModalCheckoutStore from '@/components/ModalCheckout/ModalCheckout.store'
import QuantityButton from '@/components/QuantityButton'
import { IProductItem } from '@/interface/product'
import { product } from '@/services'
import useInitializeStore from '@/store/auth'
import { useCartStore } from '@/store/cart'
import { numberFormat } from '@/utils/format'
import { ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

type Props = {}

const Product = (props: Props) => {
  const router = useRouter()
  const { onOpen: openModalCheckout } = useModalCheckoutStore()
  const { isLogin } = useInitializeStore()

  const { cartList, setCartList } = useCartStore()
  const [productDetail, setProductDetail] = useState<IProductItem | null>(null)
  const [currentImage, setCurrentImage] = useState('')
  const [amount, setAmount] = useState(1)
  const [isAuth, setIsAuth] = useState(false)

  const getProductList = async (id: string) => {
    const response = await product.getProductDetail(id)
    if (response) {
      setProductDetail(response)
      setCurrentImage(response.images[0])
    }
  }

  const renderStar = (rating: number) => {
    return [1, 2, 3, 4, 5].map((item) => {
      return (
        <svg
          key={`star-${item}`}
          aria-hidden='true'
          className={`w-5 h-5 ${
            rating >= item
              ? 'text-yellow-400'
              : 'text-gray-300 dark:text-gray-500'
          }`}
          fill='currentColor'
          viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path>
        </svg>
      )
    })
  }

  const onAddToCart = () => {
    if (productDetail && isAuth) {
      const indexItem = cartList.findIndex(
        (item) => item.id === productDetail?.id
      )
      const cart = [...cartList]
      if (indexItem !== -1) {
        cart[indexItem].amount = cart[indexItem].amount + amount
        setCartList(cart)
        return
      }
      cart.push({ ...productDetail, amount: amount })
      setCartList(cart)
      Swal.fire({
        icon: 'success',
        title: '',
        text: 'Add To Cart Successfully',
      })
    } else {
      router.push('/login')
    }
  }

  const onBuyNow = () => {
    if (isAuth) {
      openModalCheckout()
    } else {
      router.push('/login')
    }
  }

  useEffect(() => {
    if (router.query.productId) {
      getProductList(router.query.productId.toString())
    }
  }, [router.query.productId])

  useEffect(() => {
    setIsAuth(isLogin)
  }, [isLogin])

  return (
    <div className='w-full relative z-0 mt-[4px]'>
      <div className='w-[90%] max-w-[1400px] m-auto grid grid-cols-12'>
        <div className='bg-[#FFFFFF] w-full p-[10px] sm:p-[30px] xl:p-[60px] col-span-12 lg:col-span-5'>
          <Image
            src={currentImage || '/images/placeholder.png'}
            alt='banner image'
            width={1000}
            height={1000}
            className='w-80% max-h-[400px] aspect-[1/1] object-cover object-center m-auto'
          />
          <div className='grid grid-cols-5 gap-[20px] mt-[40px]'>
            {productDetail?.images.map((item, index) => {
              return (
                <Image
                  key={`product-image-${index}`}
                  onClick={() => {
                    setCurrentImage(item)
                  }}
                  role='button'
                  src={item}
                  alt='banner image'
                  width={500}
                  height={500}
                  className='w-full aspect-[1/1] object-cover object-center border'
                />
              )
            })}
          </div>
        </div>
        <div className='bg-[#F5F7FF] w-full px-[20px] py-[60px] col-span-12 lg:col-span-7'>
          {productDetail && (
            <div className=''>
              <div className='flex items-center gap-x-[10px] gap-y-[4px] flex-wrap'>
                <div className='flex items-center'>
                  {renderStar(productDetail.rating || 0)}
                </div>
                <div className='text-[12px] text-[#A2A6B0]'>
                  Reviews ({productDetail.review})
                </div>
              </div>
              <div className='text-[32px] mt-[10px] h-[50px] text-ellipsis overflow-hidden'>
                {productDetail.brand} : {productDetail?.title}
              </div>
              <div className='mt-[10px]'>{productDetail.description}</div>
              <div className='flex items-center mt-[30px]'>
                <div className='w-[140px] text-[#A2A6B0]'>Price</div>
                <div className='w-full'>
                  <span className='text-[#A2A6B0] line-through text-[16px]'>
                    $
                    {numberFormat(
                      productDetail.price +
                        (productDetail.price *
                          productDetail.discountPercentage) /
                          100
                    )}
                  </span>
                  <span className='ml-[10px] text-[20px] font-[500]'>
                    ${numberFormat(productDetail.price || 0)}
                  </span>
                </div>
              </div>
              <div className='flex items-center mt-[30px]'>
                <div className='w-[140px] text-[#A2A6B0]'>Category</div>
                <div className='w-full'>
                  <div className='w-fit p-[4px_8px] text-[14px] font-[500] text-[#FFFFFF] rounded-[20px] bg-[#4C84FF] capitalize'>
                    {productDetail.category}
                  </div>
                </div>
              </div>
              <div className='flex items-center mt-[30px]'>
                <div className='w-[140px] text-[#A2A6B0]'>Stock</div>
                <div className='w-full'>{productDetail.stock}</div>
              </div>
              <div className='flex items-center mt-[30px]'>
                <div className='w-[140px] text-[#A2A6B0]'>Amount</div>
                <div className='w-full'>
                  <div className='w-fit'>
                    <QuantityButton
                      amount={amount}
                      setAmount={setAmount}
                      max={productDetail.stock}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className='mt-[30px] gap-[16px] grid grid-cols-2 w-full'>
            <button
              onClick={onAddToCart}
              type='button'
              className='flex items-center gap-[8px] justify-center col-span-1 rounded-[60px] text-blue-700 hover:text-white border-2 border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800'
            >
              <ShoppingCart className='w-[20px] h-[20px]' /> Add To Cart
            </button>
            <button
              onClick={onBuyNow}
              type='button'
              className=' col-span-1 rounded-[60px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
      {productDetail && (
        <ModalCheckout subTotal={productDetail.price * amount} />
      )}
    </div>
  )
}

export default Product
