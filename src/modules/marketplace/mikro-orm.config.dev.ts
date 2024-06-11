import "dotenv/config"
import path from "path"
import { TSMigrationGenerator } from "@medusajs/utils"
import StoreUser from "./models/store-user"
import StoreProduct from "./models/store-product"
import StoreOrder from "./models/store-order"

module.exports = {
  entities: [StoreUser, StoreProduct, StoreOrder],
  schema: "public",
  clientUrl: "postgres://postgres@localhost/medusa-marketplace",
  type: "postgresql",
  migrations: {
    path: path.join(__dirname, "migrations"),
    generator: TSMigrationGenerator,
  },
}