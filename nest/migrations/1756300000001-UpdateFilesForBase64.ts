import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateFilesForBase641756300000001 implements MigrationInterface {
    name = 'UpdateFilesForBase641756300000001'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Изменяем поле file для хранения base64 данных (увеличиваем размер)
        await queryRunner.query(`ALTER TABLE "files" ALTER COLUMN "file" TYPE TEXT`);
        
        // Добавляем поле для хранения MIME типа
        await queryRunner.query(`ALTER TABLE "files" ADD COLUMN "mimeType" VARCHAR(100)`);
        
        // Добавляем поле для хранения оригинального имени файла
        await queryRunner.query(`ALTER TABLE "files" ADD COLUMN "originalName" VARCHAR(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "files" DROP COLUMN "originalName"`);
        await queryRunner.query(`ALTER TABLE "files" DROP COLUMN "mimeType"`);
        await queryRunner.query(`ALTER TABLE "files" ALTER COLUMN "file" TYPE VARCHAR(255)`);
    }
}