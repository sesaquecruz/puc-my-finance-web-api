import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTransactionTable1752197172508 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE transactions (
        id BIGSERIAL PRIMARY KEY,
        history TEXT NOT NULL,
        date TIMESTAMPTZ NOT NULL,
        account_id BIGINT NOT NULL REFERENCES accounts(id),
        value NUMERIC(12, 2) NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        deleted_at TIMESTAMPTZ
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE transactions;
    `);
  }
}
