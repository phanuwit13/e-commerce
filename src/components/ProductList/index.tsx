import { IProductListResponse } from '@/interface/product'
import { product } from '@/services'

import Pagination from '@/components/Pagination'
import ProductCard from '@/components/ProductCard'
import { ShoppingBag } from 'lucide-react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

type Props = {}

type SearchType = {
  limit: number
  page: number
  q?: string
}

function ProductList({}: Props) {
  const router = useRouter()
  const { limit = 20, page = 1, q = '' } = router.query
  const [productList, setProductList] = useState<IProductListResponse | null>(
    null
  )

  const getProductList = async ({ limit, page, q }: SearchType) => {
    const response = await product.getProductList({ limit, page, q })
    if (response) {
      setProductList(response)
    }
  }

  useEffect(() => {
    const data: SearchType = { limit: Number(limit), page: Number(page) }
    if (q !== undefined) {
      data['q'] = q.toString()
    }
    getProductList(data)
  }, [limit, page, q])

  return (
    <div className=' pb-[60px]'>
      {productList?.products && (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-[20px]  pb-[40px]'>
          {productList.products.map((item) => {
            return <ProductCard productItem={item} key={`product-${item.id}`} />
          })}
        </div>
      )}
      {!productList?.products.length && (
        <div className='m-auto w-fit flex flex-col justify-between items-center gap-[20px]'>
          <ShoppingBag className='text-[#cecece] w-[100px] h-[100px]' />
          <div className='text-center text-[#cecece] '>Not found product</div>
        </div>
      )}
      {productList?.total.toString() && (
        <div className='m-auto w-fit'>
          {productList?.total > Number(limit) && (
            <Pagination
              total={productList?.total || 0}
              limit={Number(limit) || 20}
              current={Number(page || 1)}
            />
          )}
        </div>
      )}
    </div>
  )
}

export default ProductList
