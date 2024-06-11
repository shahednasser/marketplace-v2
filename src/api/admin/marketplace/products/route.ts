import { 
  AuthenticatedMedusaRequest, 
  MedusaResponse
} from "@medusajs/medusa"
import { RemoteQueryFunction } from "@medusajs/modules-sdk"
import { 
  remoteQueryObjectFromString,
  ContainerRegistrationKeys,
  MedusaError
} from "@medusajs/utils"
import MarketplaceModuleService 
  from "../../../../modules/marketplace/service"

export async function GET(
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const marketplaceModuleService: MarketplaceModuleService = 
    req.scope.resolve(
      "marketplaceModuleService"
    )
  const remoteQuery: RemoteQueryFunction = req.scope.resolve(
    ContainerRegistrationKeys.REMOTE_QUERY
  )

  const storeUsers = await marketplaceModuleService.list({
    user_id: req.auth.actor_id
  })

  if (!storeUsers.length) {
    throw new MedusaError(
      MedusaError.Types.NOT_FOUND,
      "This user doesn't have an associated store."
    )
  }

  const query = remoteQueryObjectFromString({
    entryPoint: "store_product",
    fields: [
      "product.*"
    ],
    variables: {
      filters: {
        store_id: storeUsers[0].store_id
      }
    }
  })

  const result = await remoteQuery(query)

  res.json({
    store_id: storeUsers[0].store_id,
    products: result.map((data) => data.product)
  })
}
