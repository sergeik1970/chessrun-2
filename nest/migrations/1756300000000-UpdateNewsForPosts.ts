import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateNewsForPosts1756300000000 implements MigrationInterface {
    name = 'UpdateNewsForPosts1756300000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Создаем enum для категорий
        await queryRunner.query(`
            CREATE TYPE "news_category_enum" AS ENUM('travel', 'competition', 'training')
        `);

        // Добавляем новые поля к таблице news
        await queryRunner.query(`
            ALTER TABLE "news" 
            ADD COLUMN "category" "news_category_enum" NOT NULL DEFAULT 'training',
            ADD COLUMN "authorId" integer,
            ALTER COLUMN "link" DROP NOT NULL
        `);

        // Добавляем внешний ключ для автора
        await queryRunner.query(`
            ALTER TABLE "news" 
            ADD CONSTRAINT "FK_news_author" 
            FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE SET NULL
        `);

        // Обновляем таблицу files
        await queryRunner.query(`
            ALTER TABLE "files" 
            ADD COLUMN "alt" varchar,
            ADD COLUMN "isMain" boolean NOT NULL DEFAULT false
        `);

        // Добавляем внешний ключ для files -> news
        await queryRunner.query(`
            ALTER TABLE "files" 
            ADD CONSTRAINT "FK_files_news" 
            FOREIGN KEY ("newsId") REFERENCES "news"("id") ON DELETE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Удаляем внешние ключи
        await queryRunner.query(`ALTER TABLE "files" DROP CONSTRAINT "FK_files_news"`);
        await queryRunner.query(`ALTER TABLE "news" DROP CONSTRAINT "FK_news_author"`);

        // Удаляем новые колонки из files
        await queryRunner.query(`ALTER TABLE "files" DROP COLUMN "isMain"`);
        await queryRunner.query(`ALTER TABLE "files" DROP COLUMN "alt"`);

        // Удаляем новые колонки из news
        await queryRunner.query(`ALTER TABLE "news" DROP COLUMN "authorId"`);
        await queryRunner.query(`ALTER TABLE "news" DROP COLUMN "category"`);
        
        // Возвращаем link как NOT NULL
        await queryRunner.query(`ALTER TABLE "news" ALTER COLUMN "link" SET NOT NULL`);

        // Удаляем enum
        await queryRunner.query(`DROP TYPE "news_category_enum"`);
    }
}