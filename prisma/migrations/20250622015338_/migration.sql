/*
  Warnings:

  - The primary key for the `tb_layout_banner_positions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `layout_banner_Position_id` on the `tb_layout_banner_positions` table. All the data in the column will be lost.
  - The required column `layout_banner_position_id` was added to the `tb_layout_banner_positions` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "tb_layout_banner_positions" DROP CONSTRAINT "tb_layout_banner_positions_pkey",
DROP COLUMN "layout_banner_Position_id",
ADD COLUMN     "layout_banner_position_id" TEXT NOT NULL,
ADD CONSTRAINT "tb_layout_banner_positions_pkey" PRIMARY KEY ("layout_banner_position_id");
