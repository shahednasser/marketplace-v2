import { generateEntityId } from "@medusajs/utils";
import { BeforeCreate, Entity, OnInit, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
class StoreOrder {
  @PrimaryKey()
  id!: string

  @Property({ columnType: "text" })
  store_id: string

  @Property({ columnType: "text" })
  order_id: string

  @Property({ columnType: "text" })
  parent_order_id?: string

  // TODO remove once DX is available
  @BeforeCreate()
  onCreate() {
    this.id = generateEntityId(this.id, "so")
  }

  @OnInit()
  OnInit() {
    this.id = generateEntityId(this.id, "so")
  }
}

export default StoreOrder