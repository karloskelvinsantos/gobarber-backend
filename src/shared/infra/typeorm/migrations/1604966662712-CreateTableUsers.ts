import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableUsers1604966662712 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: "users",
      columns: [
        {
          name: "id",
          type: "uuid",
          isPrimary: true,
          default: "uuid_generate_v4()",
        },
        {
          name: "name",
          type: "varchar",
        },
        {
          name: "email",
          type: "varchar",
        },
        {
          name: "password",
          type: "varchar",
        },
        {
          name: "created_at",
          type: "timestamp",
          default: "now()",
          isNullable: false
        },
        {
          name: "updated_at",
          type: "timestamp",
          default: "now()",
          isNullable: true,
        }
      ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }

}
