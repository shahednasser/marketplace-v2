import { ModulesSdkUtils, Modules } from "@medusajs/utils"
import StoreUser from "./models/store-user";
import StoreProduct from "./models/store-product";
import StoreOrder from "./models/store-order";
import { CreateStoreOrderDTO, CreateStoreProductDTO, CreateStoreUserDTO, StoreOrderDTO, StoreProductDTO, StoreUserDTO } from "../../types/marketplace";
import { ModuleJoinerConfig, ModulesSdkTypes } from "@medusajs/types";

type InjectedDependencies = {
  storeUserService: ModulesSdkTypes.InternalModuleService<any>
  storeProductService: ModulesSdkTypes.InternalModuleService<any>
  storeOrderService: ModulesSdkTypes.InternalModuleService<any>
}

type AllModelsDTO = {
  StoreUser: {
    dto: StoreUserDTO
  },
  StoreProduct: {
    dto: StoreProductDTO
  },
  StoreOrder: {
    dto: StoreOrderDTO
  }
}

const generateMethodsFor = [
  StoreProduct,
  StoreOrder
]

class MarketplaceModuleService extends ModulesSdkUtils
  .abstractModuleServiceFactory<
    InjectedDependencies,
    StoreUserDTO,
    AllModelsDTO
  >(
    StoreUser, generateMethodsFor
  ) {
    storeUserService_: ModulesSdkTypes.InternalModuleService<StoreUser>
    storeProductService_: ModulesSdkTypes.InternalModuleService<StoreProduct>
    storeOrderService_: ModulesSdkTypes.InternalModuleService<StoreOrder>

    constructor({ storeUserService, storeProductService, storeOrderService }: InjectedDependencies) {
      // @ts-ignore
      super(...arguments)
      this.storeUserService_ = storeUserService
      this.storeProductService_ = storeProductService
      this.storeOrderService_ = storeOrderService
    }

    __joinerConfig(): ModuleJoinerConfig {
      return {
        serviceName: "marketplaceModuleService",
        alias: [
          {
            name: ["store_user"],
            args: {
              entity: StoreUser.name
            }
          },
          {
            name: ["store_product"],
            args: {
              entity: StoreProduct.name,
              methodSuffix: "StoreProducts"
            }
          },
          {
            name: ["store_order"],
            args: {
              entity: StoreOrder.name,
              methodSuffix: "StoreOrders"
            }
          }
        ],
        relationships: [
          {
            serviceName: Modules.STORE,
            alias: "store",
            primaryKey: "id",
            foreignKey: "store_id"
          },
          {
            serviceName: Modules.USER,
            alias: "user",
            primaryKey: "id",
            foreignKey: "user_id"
          },
          {
            serviceName: Modules.PRODUCT,
            alias: "product",
            primaryKey: "id",
            foreignKey: "product_id"
          },
          {
            serviceName: Modules.ORDER,
            alias: "order",
            primaryKey: "id",
            foreignKey: "order_id"
          },
          {
            serviceName: Modules.ORDER,
            alias: "order",
            primaryKey: "id",
            foreignKey: "parent_order_id"
          }
        ]
      }
    }

    async create(data: CreateStoreUserDTO): Promise<StoreUserDTO> {
      const storeUser = await this.storeUserService_.create(data)

      return storeUser
    }

    async createStoreProduct(data: CreateStoreProductDTO): Promise<StoreProductDTO> {
      const storeProduct = await this.storeProductService_.create(data)

      return storeProduct
    }

    async createStoreOrder(data: CreateStoreOrderDTO): Promise<StoreOrderDTO> {
      const storeProduct = await this.storeOrderService_.create(data)

      return storeProduct
    }
  }

  export default MarketplaceModuleService