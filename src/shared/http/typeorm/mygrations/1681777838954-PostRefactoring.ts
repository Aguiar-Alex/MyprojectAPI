import { MigrationInterface, QueryRunner } from 'typeorm';

export class PostRefactoring1681777838954 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "Customers" RENAME COLUMN "Customers" TO "name"',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "Customers" RENAME COLUMN "name" TO "Customers"',
    );
  }
}
