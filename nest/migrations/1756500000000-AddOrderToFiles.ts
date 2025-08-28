import { MigrationInterface, QueryRunner } from "typeorm";

export class AddOrderToFiles1756500000000 implements MigrationInterface {
    name = "AddOrderToFiles1756500000000";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "files" ADD "order" integer NOT NULL DEFAULT '0'`,
        );

        // Устанавливаем порядок для существующих изображений на основе их ID
        await queryRunner.query(`
            UPDATE "files" 
            SET "order" = subquery.row_number - 1
            FROM (
                SELECT id, ROW_NUMBER() OVER (PARTITION BY "newsId" ORDER BY id) as row_number
                FROM "files"
            ) AS subquery
            WHERE "files".id = subquery.id
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "files" DROP COLUMN "order"`);
    }
}
