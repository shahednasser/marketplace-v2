import { Migration } from '@mikro-orm/migrations';

export class Migration20240514135825 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table if exists "store_order" add column if not exists "parent_order_id" text not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table if exists "store_order" drop column if exists "parent_order_id";');
  }

}
