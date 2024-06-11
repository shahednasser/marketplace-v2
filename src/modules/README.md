# Custom Module

A module is a package of reusable functionalities. It can be integrated into your Medusa application without affecting the overall system.

To create a module:

## 1. Create a Service

A module must define a service. A service is a TypeScript or JavaScript class holding methods related to a business logic or commerce functionality.

For example, create the file `src/modules/hello/service.ts` with the following content:

```ts title="src/modules/hello/service.ts"
export default class HelloModuleService {
  getMessage() {
    return "Hello, world!"
  }
}
```

## 2. Export Module Definition

A module must have an `index.ts` file in its root directory that exports its definition. The definition specifies the main service of the module.

For example, create the file `src/modules/hello.index.ts` with the following content:

```ts title="src/modules/hello.index.ts" highlights={[["4", "", "The main service of the module."]]}
import HelloModuleService from "./service"

export default {
  service: HelloModuleService,
}
```

## 3. Add Module to Configurations

The last step is to add the module in Medusa’s configurations.

In `medusa-config.js`, add the module to the `modules` object:

```js title="medusa-config.js" highlights={[["2", "helloModuleService", "The key of the main service to be registered in the Medusa container."]]}
const modules = {
  helloModuleService: {
    resolve: "./dist/modules/hello",
  },
  // other modules...
}
```

Its key (`helloModuleService`) is the name of the module’s main service. It will be registered in the Medusa container with that name.

## Use Module

You can resolve the main service of the module in other resources, such as an API route:

```ts
import { MedusaRequest, MedusaResponse } from "@medusajs/medusa"
import HelloService from "../../../modules/hello/service"

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const helloModuleService: HelloService = req.scope.resolve(
    "helloModuleService"
  )

  res.json({
    message: helloModuleService.getMessage(),
  })
}
```
