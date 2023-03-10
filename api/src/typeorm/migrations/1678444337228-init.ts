import { MigrationInterface, QueryRunner } from "typeorm";

export class init1678444337228 implements MigrationInterface {
    name = 'init1678444337228'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "recommendation" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "description" varchar NOT NULL, "userId" integer)`);
        await queryRunner.query(`CREATE TABLE "temporary_recommendation" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "description" varchar NOT NULL, "userId" integer, CONSTRAINT "FK_61298a446857ac96c88d0a09fd0" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_recommendation"("id", "createdAt", "updatedAt", "deletedAt", "description", "userId") SELECT "id", "createdAt", "updatedAt", "deletedAt", "description", "userId" FROM "recommendation"`);
        await queryRunner.query(`DROP TABLE "recommendation"`);
        await queryRunner.query(`ALTER TABLE "temporary_recommendation" RENAME TO "recommendation"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recommendation" RENAME TO "temporary_recommendation"`);
        await queryRunner.query(`CREATE TABLE "recommendation" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "description" varchar NOT NULL, "userId" integer)`);
        await queryRunner.query(`INSERT INTO "recommendation"("id", "createdAt", "updatedAt", "deletedAt", "description", "userId") SELECT "id", "createdAt", "updatedAt", "deletedAt", "description", "userId" FROM "temporary_recommendation"`);
        await queryRunner.query(`DROP TABLE "temporary_recommendation"`);
        await queryRunner.query(`DROP TABLE "recommendation"`);
    }

}
