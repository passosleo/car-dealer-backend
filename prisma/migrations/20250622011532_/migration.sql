/*
  Warnings:

  - You are about to drop the column `type` on the `tb_layout_components` table. All the data in the column will be lost.
  - You are about to drop the column `speed` on the `tb_layout_top_bar_configs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "tb_layout_components" DROP COLUMN "type",
ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "tb_layout_top_bar_configs" DROP COLUMN "speed";
