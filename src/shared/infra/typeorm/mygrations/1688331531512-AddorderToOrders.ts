import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddorderToOrders1688331531512 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'Orders',
      new TableColumn({
        name: 'order',
        type: 'int',
        isGenerated: true,
        generationStrategy: 'increment',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('Orders', 'order');
  }
}
