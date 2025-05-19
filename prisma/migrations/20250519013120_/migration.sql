/*
  Warnings:

  - You are about to alter the column `torque` on the `tb_vehicles` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(5,2)`.

*/
-- AlterTable
ALTER TABLE "tb_vehicles" ALTER COLUMN "torque" SET DATA TYPE DECIMAL(5,2);
