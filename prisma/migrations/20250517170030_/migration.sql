/*
  Warnings:

  - Made the column `price` on table `tb_vehicles` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "tb_vehicles" ALTER COLUMN "price" SET NOT NULL;
