import { MigrationInterface, QueryRunner } from 'typeorm';

export class RefactorCustomers1681947453766 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "Customers" RENAME COLUMN "updated_at" TO "update_at"',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "Customers" RENAME COLUMN "update_at" TO "updated_at"',
    );
  }
}
