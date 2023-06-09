export interface IProductListResponse {
  products: IProductItem[]
  total: number
  skip: number
  limit: number
}

export interface IProductItem {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  category: string
  thumbnail: string
  images: string[]
  review:number
}

export interface ICartProductItem {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  category: string
  thumbnail: string
  images: string[]
  review:number,
  amount:number
}