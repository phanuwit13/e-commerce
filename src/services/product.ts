import { IProductItem, IProductListResponse } from '@/interface/product'
import { apiBaseURL } from '@/utils/config'
import axios from 'axios'

interface ParamType {
  limit?: number
  page?: number
  q?: string
}

export const product = {
  getProductList: (data: ParamType = { limit: 20, page: 1, q: '' }) => {
    const { limit = 20, page = 1, q = '' } = data
    const skip = (page - 1) * limit
    return new Promise<IProductListResponse>(async (resolve) => {
      const response = await axios.get<IProductListResponse>(
        `${apiBaseURL}/products/search`,
        {
          params: {
            limit,
            skip,
            q,
          },
        }
      )
      const mapReview = {
        ...response.data,
        products: response.data.products.map((item) => ({
          ...item,
          review: Math.floor(Math.random() * 100),
        })),
      }
      resolve(mapReview)
    })
  },
  getProductDetail: (id: string) => {
    return new Promise<IProductItem>(async (resolve) => {
      const response = await axios.get<IProductItem>(
        `${apiBaseURL}/products/${id}`
      )
      const mapReview = {
        ...response.data,
        review: Math.floor(Math.random() * 100),
      }
      resolve(mapReview)
    })
  },
}
