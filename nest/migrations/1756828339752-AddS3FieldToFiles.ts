import { MigrationInterface, QueryRunner } from "typeorm";

export class AddS3FieldToFiles1756828339752 implements MigrationInterface {
    name = 'AddS3FieldToFiles1756828339752'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "files" ADD "s3Key" character varying(500)`);
        await queryRunner.query(`ALTER TABLE "files" ADD "s3Url" character varying(1000)`);
        await queryRunner.query(`ALTER TABLE "files" ALTER COLUMN "file" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "files" ALTER COLUMN "file" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "files" DROP COLUMN "s3Url"`);
        await queryRunner.query(`ALTER TABLE "files" DROP COLUMN "s3Key"`);
    }

}
