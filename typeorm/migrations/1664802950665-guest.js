const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class guest1664802950665 {
    name = 'guest1664802950665'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "guest" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, CONSTRAINT "PK_57689d19445de01737dbc458857" PRIMARY KEY ("id"))`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "guest"`);
    }
}
