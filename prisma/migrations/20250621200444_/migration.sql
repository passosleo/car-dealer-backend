/*
  Warnings:

  - A unique constraint covering the columns `[page]` on the table `tb_layout_components` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `page` to the `tb_layout_components` table without a default value. This is not possible if the table is not empty.
  - Added the required column `layout_top_bar_config_id` to the `tb_layout_top_bar_messages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tb_layout_banner_configs" ADD COLUMN     "max_items" INTEGER NOT NULL DEFAULT 10;

-- AlterTable
ALTER TABLE "tb_layout_components" ADD COLUMN     "page" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "tb_layout_top_bar_configs" ADD COLUMN     "max_items" INTEGER NOT NULL DEFAULT 10;

-- AlterTable
ALTER TABLE "tb_layout_top_bar_messages" ADD COLUMN     "layout_top_bar_config_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "tb_layout_components_page_key" ON "tb_layout_components"("page");

-- AddForeignKey
ALTER TABLE "tb_layout_top_bar_messages" ADD CONSTRAINT "tb_layout_top_bar_messages_layout_top_bar_config_id_fkey" FOREIGN KEY ("layout_top_bar_config_id") REFERENCES "tb_layout_top_bar_configs"("layout_top_bar_config_id") ON DELETE CASCADE ON UPDATE CASCADE;
