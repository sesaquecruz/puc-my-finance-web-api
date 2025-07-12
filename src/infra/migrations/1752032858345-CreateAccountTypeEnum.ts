import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAccountTypeEnum1752032858345 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TYPE account_type AS ENUM (
        'R',
        'D'
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TYPE account_type;
    `);
  }
}
