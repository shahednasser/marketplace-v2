import { SubscriberArgs, type SubscriberConfig } from "@medusajs/medusa"
import { ModuleRegistrationName } from "@medusajs/modules-sdk"
import { 
  IProductModuleService,
} from "@medusajs/types"
import MarketplaceModuleService from "../modules/marketplace/service"

// subscriber function
export default async function productCreateHandler({
  data,
  container
}: SubscriberArgs<{ id: string }>) {
  // @ts-expect-error remove/change when typing is resolved.
  const { id } = data.data || data
  const productModuleService: IProductModuleService = container.resolve(
    ModuleRegistrationName.PRODUCT
  )
  
  const marketplaceModuleService: MarketplaceModuleService = container.resolve(
    "marketplaceModuleService"
  )

  // retrieve product
  const product = await productModuleService.retrieve(id)

  if (!product.metadata?.store_id) {
    return
  }

  await marketplaceModuleService.createStoreProduct({
    store_id: product.metadata.store_id as string,
    product_id: id
  })
}

// subscriber config
export const config: SubscriberConfig = {
  event: "product.created",
}