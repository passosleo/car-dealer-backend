/*
  Warnings:

  - A unique constraint covering the columns `[plate]` on the table `tb_vehicles` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `plate` to the `tb_vehicles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tb_vehicles" ADD COLUMN     "plate" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "tb_vehicles_plate_key" ON "tb_vehicles"("plate");
