export interface Product {
  id: string,
  price: number,
  rating?: {
    rate: number,
    count: number
  },
  title: string,
  description?: string,
  image?: string,
  stock: number
}
