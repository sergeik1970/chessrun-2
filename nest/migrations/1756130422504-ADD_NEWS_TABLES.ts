import { MigrationInterface, QueryRunner } from "typeorm";

export class ADDNEWSTABLES1756130422504 implements MigrationInterface {
    name = "ADDNEWSTABLES1756130422504";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "news" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "link" character varying NOT NULL, "body" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_39a43dfcb6007180f04aff2357e" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "slider" ("id" SERIAL NOT NULL, "newsId" integer NOT NULL, "url" character varying NOT NULL, CONSTRAINT "PK_ae59f1b572454f8251212e2d3dc" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "files" ("id" SERIAL NOT NULL, "newsId" integer NOT NULL, "file" character varying NOT NULL, CONSTRAINT "PK_6c16b9093a142e0e7613b04a3d9" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updatedAt"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "user" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP`,
        );
        await queryRunner.query(
            `ALTER TABLE "user" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP`,
        );
        await queryRunner.query(`DROP TABLE "files"`);
        await queryRunner.query(`DROP TABLE "slider"`);
        await queryRunner.query(`DROP TABLE "news"`);
    }
}
