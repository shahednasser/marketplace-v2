import { 
  StoreDTO, 
  UserDTO,
  ProductDTO,
  OrderDTO
} from "@medusajs/types"

export type StoreUserDTO = {
  id: string
  store_id: string
  user_id: string
  store?: StoreDTO
  user?: UserDTO
}

export type StoreProductDTO = {
  id: string
  store_id: string
  product_id: string
  store?: StoreDTO
  product?: ProductDTO
}

export type StoreOrderDTO = {
  id: string
  store_id: string
  order_id: string
  parent_order_id?: string
  store?: StoreDTO
  order?: OrderDTO
}

export type CreateStoreUserDTO = {
  store_id: string
  user_id: string
}

export type CreateStoreProductDTO = {
  store_id: string
  product_id: string
}

export type CreateStoreOrderDTO = {
  store_id: string
  order_id: string
  parent_order_id?: string
}