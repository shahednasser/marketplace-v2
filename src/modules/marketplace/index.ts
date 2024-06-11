import StoreOrder from "./models/store-order";
import StoreProduct from "./models/store-product";
import StoreUser from "./models/store-user";
import MarketplaceModuleService from "./service";
import { ModulesSdkUtils, MikroOrmBaseRepository, } from "@medusajs/utils"

// define useful constants
const moduleName = "marketplace"
const pathToMigrations = __dirname + "/migrations"
const models = {
  StoreUser,
  StoreProduct,
  StoreOrder
}

// assemble object to pass to utility functions
const migrationScriptOptions = {
  // the module's name
  moduleName,
  // the data models of the modules
  models,
  // the path to the migrations directory
  pathToMigrations,
}

// create and export the script that runs migrations
export const runMigrations = ModulesSdkUtils
  .buildMigrationScript(
    migrationScriptOptions
  )

// create and export the script that reverts migrations
export const revertMigration = ModulesSdkUtils
  .buildRevertMigrationScript(
    migrationScriptOptions
  )

const containerLoader = ModulesSdkUtils.moduleContainerLoaderFactory({
  moduleModels: models,
  moduleRepositories: {
    BaseRepository: MikroOrmBaseRepository,
  },
  moduleServices: {
    MarketplaceModuleService,
  },
})

const connectionLoader = ModulesSdkUtils
  .mikroOrmConnectionLoaderFactory({
    moduleName,
    moduleModels: Object.values(models),
    migrationsPath: pathToMigrations,
  })

export default {
  service: MarketplaceModuleService,
  // add the run and revert migration scripts to the module's definition
  runMigrations,
  revertMigration,
  loaders: [containerLoader, connectionLoader]
}