import { MiddlewaresConfig, } from "@medusajs/medusa"
import { 
  authenticate,
} from "@medusajs/medusa/dist/utils/authenticate-middleware"

export const config: MiddlewaresConfig = {
  routes: [
    {
      matcher: "/admin/marketplace*",
      middlewares: [
        authenticate("admin", ["session", "bearer", "api-key"]),
      ],
    },
  ],
}