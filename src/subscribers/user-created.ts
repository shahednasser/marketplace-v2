import { SubscriberArgs, type SubscriberConfig } from "@medusajs/medusa"
import { ModuleRegistrationName } from "@medusajs/modules-sdk"
import { 
  IUserModuleService,
  IStoreModuleService
} from "@medusajs/types"
import MarketplaceModuleService from "../modules/marketplace/service"

// subscriber function
export default async function userCreatedHandler({
  data,
  container
}: SubscriberArgs<{ id: string }>) {
  // @ts-expect-error remove/change when typing is resolved.
  const { id } = data.data || { data }
  const userModuleService: IUserModuleService = container.resolve(
    ModuleRegistrationName.USER
  )
  const storeModuleService: IStoreModuleService = container.resolve(
    ModuleRegistrationName.STORE
  )
  const marketplaceModuleService: MarketplaceModuleService = container.resolve(
    "marketplaceModuleService"
  )

  // retrieve user 
  const user = await userModuleService.retrieve(id)

  // create store
  const store = await storeModuleService.create({
    name: `${user.first_name}'s Store`
  })
  
  // create StoreUser
  const storeUser = await marketplaceModuleService.create({
    store_id: store.id,
    user_id: user.id
  })

  console.log(`Created StoreUser ${storeUser.id}`)
}

// subscriber config
export const config: SubscriberConfig = {
  event: "user.created",
}