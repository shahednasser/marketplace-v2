import { generateEntityId } from "@medusajs/utils";
import { BeforeCreate, Entity, OnInit, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
class StoreProduct {
  @PrimaryKey()
  id!: string

  @Property({ columnType: "text" })
  store_id: string

  @Property({ columnType: "text" })
  product_id: string

  // TODO remove once DX is available
  @BeforeCreate()
  onCreate() {
    this.id = generateEntityId(this.id, "sp")
  }

  @OnInit()
  OnInit() {
    this.id = generateEntityId(this.id, "sp")
  }
}

export default StoreProduct