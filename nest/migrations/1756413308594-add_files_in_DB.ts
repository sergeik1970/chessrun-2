import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFilesInDB1756413308594 implements MigrationInterface {
    name = 'AddFilesInDB1756413308594'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "files" DROP CONSTRAINT "FK_files_news"`);
        await queryRunner.query(`ALTER TABLE "news" DROP CONSTRAINT "FK_news_author"`);
        await queryRunner.query(`ALTER TABLE "files" ADD "type" character varying(50) NOT NULL DEFAULT 'image'`);
        await queryRunner.query(`ALTER TABLE "files" ADD "title" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "files" ADD "size" integer`);
        await queryRunner.query(`ALTER TABLE "files" ADD CONSTRAINT "FK_903a7d2ac384bdcdd6241601236" FOREIGN KEY ("newsId") REFERENCES "news"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "news" ADD CONSTRAINT "FK_18ab67e7662dbc5d45dc53a6e00" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "news" DROP CONSTRAINT "FK_18ab67e7662dbc5d45dc53a6e00"`);
        await queryRunner.query(`ALTER TABLE "files" DROP CONSTRAINT "FK_903a7d2ac384bdcdd6241601236"`);
        await queryRunner.query(`ALTER TABLE "files" DROP COLUMN "size"`);
        await queryRunner.query(`ALTER TABLE "files" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "files" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "news" ADD CONSTRAINT "FK_news_author" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "files" ADD CONSTRAINT "FK_files_news" FOREIGN KEY ("newsId") REFERENCES "news"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
