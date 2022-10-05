const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class init1664634671404 {
    name = 'init1664634671404'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "Meetup" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" text NOT NULL, "datetime" TIMESTAMP NOT NULL, "address" character varying NOT NULL, "tags" character varying array NOT NULL, CONSTRAINT "PK_df3e2a55e214db6cae422b5e213" PRIMARY KEY ("id"))`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "Meetup"`);
    }
}
