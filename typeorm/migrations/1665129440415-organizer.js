const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class organizer1665129440415 {
    name = 'organizer1665129440415'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, CONSTRAINT "UQ_638bac731294171648258260ff2" UNIQUE ("password"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Meetup" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" text NOT NULL, "datetime" TIMESTAMP NOT NULL, "address" character varying NOT NULL, "tags" character varying array NOT NULL, CONSTRAINT "PK_df3e2a55e214db6cae422b5e213" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "meetup_guests_user" ("meetupId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_ca43995de53244abc3c4fffec6c" PRIMARY KEY ("meetupId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e7208b4e39642f0a5154adb118" ON "meetup_guests_user" ("meetupId") `);
        await queryRunner.query(`CREATE INDEX "IDX_83ea59effa8ebaa26238ea462f" ON "meetup_guests_user" ("userId") `);
        await queryRunner.query(`ALTER TABLE "meetup_guests_user" ADD CONSTRAINT "FK_e7208b4e39642f0a5154adb1189" FOREIGN KEY ("meetupId") REFERENCES "Meetup"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "meetup_guests_user" ADD CONSTRAINT "FK_83ea59effa8ebaa26238ea462f5" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "meetup_guests_user" DROP CONSTRAINT "FK_83ea59effa8ebaa26238ea462f5"`);
        await queryRunner.query(`ALTER TABLE "meetup_guests_user" DROP CONSTRAINT "FK_e7208b4e39642f0a5154adb1189"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_83ea59effa8ebaa26238ea462f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e7208b4e39642f0a5154adb118"`);
        await queryRunner.query(`DROP TABLE "meetup_guests_user"`);
        await queryRunner.query(`DROP TABLE "Meetup"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }
}
