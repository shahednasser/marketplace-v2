import { 
  type SubscriberArgs, 
  type SubscriberConfig
} from "@medusajs/medusa"
import { ModuleRegistrationName } from "@medusajs/modules-sdk"
import { 
  IOrderModuleService,
  CreateOrderDTO
} from "@medusajs/types"
import MarketplaceModuleService 
  from "../modules/marketplace/service"
import { createOrdersWorkflow } from "@medusajs/core-flows"

export default async function orderCreatedHandler({
  data,
  container
}: SubscriberArgs<{ id: string }>) {
  // @ts-expect-error remove/change when typing is resolved.
  const { id } = data.data || data
  const orderModuleService: IOrderModuleService = 
    container.resolve(
      ModuleRegistrationName.ORDER
    )
  
  const marketplaceModuleService: MarketplaceModuleService = 
    container.resolve(
      "marketplaceModuleService"
    )

  const storeToOrders: Record<string, CreateOrderDTO> = {}

  const order = await orderModuleService.retrieve(id, {
    relations: ["items"]
  })

  await Promise.all(order.items?.map(async (item) => {
    const storeProduct = await marketplaceModuleService
      .listStoreProducts({
        product_id: item.product_id
      })

    if (!storeProduct.length) {
      return
    }

    const storeId = storeProduct[0].store_id
    
    if (!storeToOrders[storeId]) {
      const { id, ...orderDetails } = order
      storeToOrders[storeId] = {
        ...orderDetails,
        items: []
      }
    }

    const { id, ...itemDetails } = item

    storeToOrders[storeId].items.push(itemDetails)
  }))

  const storeToOrdersKeys = Object.keys(storeToOrders)

  if (!storeToOrdersKeys.length) {
    return
  }

  if (
    storeToOrdersKeys.length === 1 && 
    storeToOrders[0].items.length === order.items.length
  ) {
    // The order is composed of items from one store, so 
    // associate the order as-is with the store.
    await marketplaceModuleService.createStoreOrder({
      store_id: storeToOrdersKeys[0],
      order_id: order.id
    })

    return
  }

  // create store orders for each child order
  await Promise.all(
    storeToOrdersKeys.map(async (storeId) => {
      const { result } = await createOrdersWorkflow(container)
        .run({
          input: storeToOrders[storeId]
        })

      await marketplaceModuleService.createStoreOrder({
        store_id: storeId,
        order_id: result.id,
        parent_order_id: order.id
      })
    })
  )
}

export const config: SubscriberConfig = {
  event: "order.created",
}