import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1669659112392 implements MigrationInterface {
    name = '$npmConfigName1669659112392'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "BankExternalAccounts" DROP CONSTRAINT "FK_3ebe4230b29b5294af792326cda"`);
        await queryRunner.query(`ALTER TABLE "users_roles_roles" DROP CONSTRAINT "FK_df951a64f09865171d2d7a502b1"`);
        await queryRunner.query(`ALTER TABLE "users_roles_roles" DROP CONSTRAINT "FK_b2f0366aa9349789527e0c36d97"`);
        await queryRunner.query(`ALTER TABLE "BankExternalAccounts" RENAME COLUMN "AccountNumber" TO "account_number"`);
        await queryRunner.query(`CREATE TABLE "bank_internal_transactions" ("Id" SERIAL NOT NULL, "CreatedDate" TIMESTAMP NOT NULL DEFAULT now(), "UpdatedDate" TIMESTAMP NOT NULL DEFAULT now(), "IsDeleted" boolean NOT NULL DEFAULT false, "transfer_from" integer NOT NULL, "transfer_to" integer NOT NULL, "transfer_amount" integer NOT NULL, "description" character varying NOT NULL, "transferFromId" integer, "transferToId" integer, CONSTRAINT "PK_f7d82252bb78ac2f9f0a18910c9" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE TABLE "bank_internal_accounts" ("Id" SERIAL NOT NULL, "CreatedDate" TIMESTAMP NOT NULL DEFAULT now(), "UpdatedDate" TIMESTAMP NOT NULL DEFAULT now(), "IsDeleted" boolean NOT NULL DEFAULT false, "account_number" character varying NOT NULL, "balance" integer NOT NULL, "userId" integer, CONSTRAINT "PK_70e952811044aabcc18ac1cb371" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE TABLE "roles" ("Id" SERIAL NOT NULL, "CreatedDate" TIMESTAMP NOT NULL DEFAULT now(), "UpdatedDate" TIMESTAMP NOT NULL DEFAULT now(), "IsDeleted" boolean NOT NULL DEFAULT false, "name" character varying NOT NULL, CONSTRAINT "PK_6a0cac17a09f6fd8629340b8cdf" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("Id" SERIAL NOT NULL, "CreatedDate" TIMESTAMP NOT NULL DEFAULT now(), "UpdatedDate" TIMESTAMP NOT NULL DEFAULT now(), "IsDeleted" boolean NOT NULL DEFAULT false, "user_name" character varying NOT NULL, "password" character varying NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "refresh_token" character varying NOT NULL, CONSTRAINT "PK_99a6fd82d4e6f4faed5eee5d00a" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE TABLE "external_banks" ("Id" SERIAL NOT NULL, "CreatedDate" TIMESTAMP NOT NULL DEFAULT now(), "UpdatedDate" TIMESTAMP NOT NULL DEFAULT now(), "IsDeleted" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_42058e509024fa1ae5a48728e48" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`ALTER TABLE "bank_internal_transactions" ADD CONSTRAINT "FK_5977c1ba6f81490d1bb1d74e814" FOREIGN KEY ("transferFromId") REFERENCES "bank_internal_accounts"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bank_internal_transactions" ADD CONSTRAINT "FK_d49680825a8edfaeaa9ada94cf2" FOREIGN KEY ("transferToId") REFERENCES "bank_internal_accounts"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bank_internal_accounts" ADD CONSTRAINT "FK_fe1297e478322c60dc2ef0059d6" FOREIGN KEY ("userId") REFERENCES "users"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "BankExternalAccounts" ADD CONSTRAINT "FK_3ebe4230b29b5294af792326cda" FOREIGN KEY ("externalBankId") REFERENCES "external_banks"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_roles_roles" ADD CONSTRAINT "FK_df951a64f09865171d2d7a502b1" FOREIGN KEY ("usersId") REFERENCES "users"("Id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_roles_roles" ADD CONSTRAINT "FK_b2f0366aa9349789527e0c36d97" FOREIGN KEY ("rolesId") REFERENCES "roles"("Id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_roles_roles" DROP CONSTRAINT "FK_b2f0366aa9349789527e0c36d97"`);
        await queryRunner.query(`ALTER TABLE "users_roles_roles" DROP CONSTRAINT "FK_df951a64f09865171d2d7a502b1"`);
        await queryRunner.query(`ALTER TABLE "BankExternalAccounts" DROP CONSTRAINT "FK_3ebe4230b29b5294af792326cda"`);
        await queryRunner.query(`ALTER TABLE "bank_internal_accounts" DROP CONSTRAINT "FK_fe1297e478322c60dc2ef0059d6"`);
        await queryRunner.query(`ALTER TABLE "bank_internal_transactions" DROP CONSTRAINT "FK_d49680825a8edfaeaa9ada94cf2"`);
        await queryRunner.query(`ALTER TABLE "bank_internal_transactions" DROP CONSTRAINT "FK_5977c1ba6f81490d1bb1d74e814"`);
        await queryRunner.query(`DROP TABLE "external_banks"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TABLE "bank_internal_accounts"`);
        await queryRunner.query(`DROP TABLE "bank_internal_transactions"`);
        await queryRunner.query(`ALTER TABLE "BankExternalAccounts" RENAME COLUMN "account_number" TO "AccountNumber"`);
        await queryRunner.query(`ALTER TABLE "users_roles_roles" ADD CONSTRAINT "FK_b2f0366aa9349789527e0c36d97" FOREIGN KEY ("rolesId") REFERENCES "Roles"("Id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_roles_roles" ADD CONSTRAINT "FK_df951a64f09865171d2d7a502b1" FOREIGN KEY ("usersId") REFERENCES "Users"("Id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "BankExternalAccounts" ADD CONSTRAINT "FK_3ebe4230b29b5294af792326cda" FOREIGN KEY ("externalBankId") REFERENCES "ExternalBanks"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
