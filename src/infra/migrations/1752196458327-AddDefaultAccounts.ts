import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDefaultAccounts1752196458327 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO accounts 
        (id, description, type)
      VALUES 
        (1, 'Combustível', 'D'),
        (2, 'Supermercado', 'D'),
        (3, 'Almoço', 'D'),
        (4, 'IPTU', 'D'),
        (5, 'IPVA', 'D'),
        (6, 'Salário', 'R'),
        (7, 'Crédito de Juros', 'R'),
        (8, 'Apartamento de Aluguel', 'R');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM accounts
      WHERE id IN (1, 2, 3, 4, 5, 6, 7, 8);
    `);
  }
}
