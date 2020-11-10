import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTableAppointments1604630754874 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: "appointments",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            default: "uuid_generate_v4()",
          },
          {
            name: "provider",
            type: "varchar",
            isNullable: false, 
          },
          {
            name: "date",
            type: "timestamp with time zone",
          }
        ]
      }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('appointments');
    }

}
