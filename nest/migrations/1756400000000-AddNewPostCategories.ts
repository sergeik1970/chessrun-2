import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNewPostCategories1756400000000 implements MigrationInterface {
    name = 'AddNewPostCategories1756400000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Добавляем новые значения в enum для категорий постов
        await queryRunner.query(`ALTER TYPE "news_category_enum" ADD VALUE 'news'`);
        await queryRunner.query(`ALTER TYPE "news_category_enum" ADD VALUE 'events'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // В PostgreSQL нельзя удалить значения из enum напрямую
        // Нужно пересоздать enum без новых значений
        await queryRunner.query(`
            CREATE TYPE "news_category_enum_old" AS ENUM('travel', 'competition', 'training')
        `);
        
        // Обновляем все записи с новыми категориями на дефолтную
        await queryRunner.query(`
            UPDATE "news" SET "category" = 'training' 
            WHERE "category" IN ('news', 'events')
        `);
        
        // Меняем тип колонки на старый enum
        await queryRunner.query(`
            ALTER TABLE "news" ALTER COLUMN "category" TYPE "news_category_enum_old" 
            USING "category"::text::"news_category_enum_old"
        `);
        
        // Удаляем старый enum и переименовываем новый
        await queryRunner.query(`DROP TYPE "news_category_enum"`);
        await queryRunner.query(`ALTER TYPE "news_category_enum_old" RENAME TO "news_category_enum"`);
    }
}