import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAccountTable1752032967893 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE accounts (
        id BIGSERIAL PRIMARY KEY,
        description TEXT NOT NULL,
        type account_type NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        deleted_at TIMESTAMPTZ
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE accounts;
    `);
  }
}
