import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameBodyToText1756838206093 implements MigrationInterface {
    name = 'RenameBodyToText1756838206093'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "news" RENAME COLUMN "body" TO "text"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "news" RENAME COLUMN "text" TO "body"`);
    }

}
