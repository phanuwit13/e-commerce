import { IProductItem } from '@/interface/product'
import { numberFormat } from '@/utils/format'
import { Heart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  productItem: IProductItem
}

const ProductCard = ({ productItem }: Props) => {
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

  return (
    <div className='relative border' key={`product-list-${productItem.id}`}>
      <div
        role='button'
        className='group absolute right-[8px] top-[6px] rounded-full flex justify-center items-center'
      >
        <Heart className='stroke-[2px] text-[#d4d4d4] group-hover:fill-[#DC4A5A] group-hover:text-[#DC4A5A] fill-[#FFFFFF] w-[30px] h-[30px]' />
      </div>
      <Link href={`/product/${productItem.id}`}>
        <div>
          <Image
            width={340}
            height={340}
            alt={productItem.title}
            src={productItem.thumbnail}
            className='aspect-square m-auto'
          />
        </div>
        <div className='p-[12px_12px]'>
          <div className='flex items-center gap-x-[10px] gap-y-[4px] mt-[10px] flex-wrap'>
            <div className='flex items-center'>
              {renderStar(productItem.rating)}
            </div>
            <div className='text-[12px] text-[#A2A6B0]'>
              Reviews ({productItem.review})
            </div>
          </div>
          <div className='mt-[10px] h-[50px] text-ellipsis overflow-hidden'>
            {productItem.brand} : {productItem.title}
          </div>
          <div className='mt-[20px]'>
            <span className='text-[#A2A6B0] line-through text-[16px]'>
              $
              {numberFormat(
                productItem.price +
                  (productItem.price * productItem.discountPercentage) / 100
              )}
            </span>
          </div>
          <div>
            <span className='text-[20px] font-[500]'>
              ${numberFormat(productItem.price)}
            </span>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ProductCard
