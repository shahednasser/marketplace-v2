import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import { createOrdersWorkflow } from "@medusajs/core-flows"

export async function POST(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const { result } = await createOrdersWorkflow(req.scope)
    .run({
      input: {
        region_id: "reg_01HXVQ5EG94YY3VTJ7VSE0D6AH",
        email: "customer@test.com",
        items: [{
          title: "Shirt",
          product_id: "prod_01HXVH9298B36Y87Q65X766SYN",
          quantity: 2,
          unit_price: "3000"
        }]
      }
    })

  res.json({
    order: result
  })
}
