import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1775242889684 implements MigrationInterface {
    name = 'Init1775242889684'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "company" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "companyName" character varying NOT NULL, "ntn" character varying, "province" character varying, "address" text, "fbrToken" text, "isDefault" boolean NOT NULL DEFAULT false, "userId" uuid NOT NULL, CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "customers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "registrationStatus" character varying NOT NULL DEFAULT 'Unregistered', "ntn" character varying, "cnic" character varying, "businessType" character varying, "contactPerson" character varying, "contactNo" character varying, "address" character varying NOT NULL, "province" character varying NOT NULL, "city" character varying, "country" character varying, "remarks" text, "userId" uuid NOT NULL, "companyId" uuid, CONSTRAINT "PK_133ec679a801fab5e070f73d3ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_conversions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "uom" character varying NOT NULL, "qty" numeric(12,2) NOT NULL, "productId" uuid NOT NULL, CONSTRAINT "PK_1ba9f46b16aac7a6fdcab01bbf7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "category" character varying, "hsCode" character varying NOT NULL, "uom" character varying NOT NULL, "salePrice" numeric(12,2) NOT NULL DEFAULT '0', "purchasePrice" numeric(12,2) NOT NULL DEFAULT '0', "remarks" text, "customerId" uuid NOT NULL, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "invoice_items" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "productId" uuid NOT NULL, "saleType" character varying NOT NULL, "taxRate" numeric(5,2) NOT NULL DEFAULT '0', "qty" numeric(12,2) NOT NULL, "unitPrice" numeric(12,2) NOT NULL, "amountExclTax" numeric(12,2) NOT NULL, "fixedNotifiedValue" numeric(12,2) NOT NULL DEFAULT '0', "salesTaxApplicable" numeric(12,2) NOT NULL DEFAULT '0', "salesTaxWithheldAtSource" numeric(12,2) NOT NULL DEFAULT '0', "extraTax" numeric(12,2) NOT NULL DEFAULT '0', "furtherTax" numeric(12,2) NOT NULL DEFAULT '0', "fedPayable" numeric(12,2) NOT NULL DEFAULT '0', "discount" numeric(12,2) NOT NULL DEFAULT '0', "sroScheduleNo" character varying, "sroItemSerialNo" character varying, "totalAmount" numeric(12,2) NOT NULL, "invoiceId" uuid NOT NULL, CONSTRAINT "PK_53b99f9e0e2945e69de1a12b75a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "invoices" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "invoiceDate" date NOT NULL, "invoiceType" character varying NOT NULL, "invoiceRefNo" character varying, "remarks" text, "userId" uuid NOT NULL, "customerId" uuid NOT NULL, "companyId" uuid, CONSTRAINT "PK_668cef7c22a427fd822cc1be3ce" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying, "isVerified" boolean NOT NULL DEFAULT false, "verificationCode" character varying NOT NULL DEFAULT '', "isPassCodeValid" boolean NOT NULL DEFAULT false, "fbrToken" character varying NOT NULL, "fbrEnv" character varying NOT NULL DEFAULT 'sandbox', "isActive" boolean NOT NULL DEFAULT true, "picture" character varying, "cnic" character varying, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "FK_c41a1d36702f2cd0403ce58d33a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "customers" ADD CONSTRAINT "FK_b8512aa9cef03d90ed5744c94d7" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "customers" ADD CONSTRAINT "FK_568c2136b0779d63539cf84fafc" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_conversions" ADD CONSTRAINT "FK_d229f3f7831b915d86af233af19" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_be9f5a8a97d003e4661c4c40527" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "invoice_items" ADD CONSTRAINT "FK_7bec360ed9928668b73dac2ec17" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "invoice_items" ADD CONSTRAINT "FK_7fb6895fc8fad9f5200e91abb59" FOREIGN KEY ("invoiceId") REFERENCES "invoices"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "invoices" ADD CONSTRAINT "FK_fcbe490dc37a1abf68f19c5ccb9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "invoices" ADD CONSTRAINT "FK_1df049f8943c6be0c1115541efb" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "invoices" ADD CONSTRAINT "FK_0b793047e7030ef060eaae8438a" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invoices" DROP CONSTRAINT "FK_0b793047e7030ef060eaae8438a"`);
        await queryRunner.query(`ALTER TABLE "invoices" DROP CONSTRAINT "FK_1df049f8943c6be0c1115541efb"`);
        await queryRunner.query(`ALTER TABLE "invoices" DROP CONSTRAINT "FK_fcbe490dc37a1abf68f19c5ccb9"`);
        await queryRunner.query(`ALTER TABLE "invoice_items" DROP CONSTRAINT "FK_7fb6895fc8fad9f5200e91abb59"`);
        await queryRunner.query(`ALTER TABLE "invoice_items" DROP CONSTRAINT "FK_7bec360ed9928668b73dac2ec17"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_be9f5a8a97d003e4661c4c40527"`);
        await queryRunner.query(`ALTER TABLE "product_conversions" DROP CONSTRAINT "FK_d229f3f7831b915d86af233af19"`);
        await queryRunner.query(`ALTER TABLE "customers" DROP CONSTRAINT "FK_568c2136b0779d63539cf84fafc"`);
        await queryRunner.query(`ALTER TABLE "customers" DROP CONSTRAINT "FK_b8512aa9cef03d90ed5744c94d7"`);
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "FK_c41a1d36702f2cd0403ce58d33a"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "invoices"`);
        await queryRunner.query(`DROP TABLE "invoice_items"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "product_conversions"`);
        await queryRunner.query(`DROP TABLE "customers"`);
        await queryRunner.query(`DROP TABLE "company"`);
    }

}
