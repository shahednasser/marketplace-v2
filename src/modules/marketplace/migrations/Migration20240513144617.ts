import { Migration } from '@mikro-orm/migrations';

export class Migration20240513144617 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table if not exists "store_order" ("id" varchar(255) not null, "store_id" text not null, "order_id" text not null, constraint "store_order_pkey" primary key ("id"));');

    this.addSql('create table if not exists "store_product" ("id" varchar(255) not null, "store_id" text not null, "product_id" text not null, constraint "store_product_pkey" primary key ("id"));');

    this.addSql('create table if not exists "store_user" ("id" varchar(255) not null, "store_id" text not null, "user_id" text not null, constraint "store_user_pkey" primary key ("id"));');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "store_order" cascade;');

    this.addSql('drop table if exists "store_product" cascade;');

    this.addSql('drop table if exists "store_user" cascade;');
  }

}
