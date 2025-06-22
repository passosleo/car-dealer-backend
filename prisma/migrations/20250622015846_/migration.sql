/*
  Warnings:

  - Added the required column `label` to the `tb_layout_components` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tb_layout_components" ADD COLUMN     "label" TEXT NOT NULL;
