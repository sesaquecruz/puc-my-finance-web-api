import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDefaultTransactions1752197801885 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO transactions 
        (id, history, date, account_id, value)
      VALUES 
        (100, 'Gasolina Viagem', '2022-12-20 14:00:00-03:00', 1, 289.00),
        (200, 'Almoço Família', '2022-12-24 12:30:00-03:00', 3, 120.00),
        (300, 'Salário', '2023-01-05 00:00:00-03:00', 6, 1000.00),
        (400, 'IPVA', '2023-01-10 13:30:00-03:00', 5, 250.00);
    `);

    await queryRunner.query(`
      SELECT setval('transactions_id_seq', (SELECT MAX(id) FROM transactions));
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM transactions
      WHERE id IN (100, 200, 300, 400);
    `);
  }
}
