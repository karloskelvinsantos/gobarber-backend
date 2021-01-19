import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddColumnsCreatedAndUpdatedAppointment1604967476314 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn("appointments", new TableColumn(
      {
        name: "created_at",
        type: "timestamp",
        default: "now()",
        isNullable: false
      },
    ));

    await queryRunner.addColumn("appointments", new TableColumn(
      {
        name: "updated_at",
        type: "timestamp",
        default: "now()",
        isNullable: true,
      }
    ));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("appointments", "created_at");

    await queryRunner.dropColumn("appointments", "updated_at");
  }

}
