import { generateEntityId } from "@medusajs/utils";
import { BeforeCreate, Entity, OnInit, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
class StoreUser {
  @PrimaryKey()
  id!: string

  @Property({ columnType: "text" })
  store_id: string

  @Property({ columnType: "text" })
  user_id: string

  // TODO remove once DX is available
  @BeforeCreate()
  onCreate() {
    this.id = generateEntityId(this.id, "su")
  }

  @OnInit()
  OnInit() {
    this.id = generateEntityId(this.id, "su")
  }
}

export default StoreUser