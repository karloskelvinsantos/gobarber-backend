import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddColumnProviderIdAppointment1604966781204 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("appointments", "provider");

    await queryRunner.addColumn("appointments", new TableColumn({
      name: "provider_id",
      type: "uuid",
    }));

    await queryRunner.createForeignKey("appointments", new TableForeignKey({
      name: "appointment_provider_fk",
      columnNames: ["provider_id"],
      referencedColumnNames: ["id"],
      referencedTableName: "users",
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("appointments", "appointment_provider_fk");

    await queryRunner.dropColumn("appointments", "provider_id");

    await queryRunner.addColumn("appointments", new TableColumn({
      name: "provider",
      type: "varchar",
    }));
  }

}
