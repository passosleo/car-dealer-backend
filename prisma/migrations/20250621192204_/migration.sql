/*
  Warnings:

  - You are about to drop the `tb_top_bar_messages` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "tb_top_bar_messages";

-- CreateTable
CREATE TABLE "tb_layout_components" (
    "layout_component_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT,
    "position" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "tb_layout_components_pkey" PRIMARY KEY ("layout_component_id")
);

-- CreateTable
CREATE TABLE "tb_layout_top_bar_configs" (
    "layout_top_bar_config_id" TEXT NOT NULL,
    "layout_component_id" TEXT NOT NULL,
    "speed" INTEGER NOT NULL DEFAULT 0,
    "loop" BOOLEAN NOT NULL DEFAULT true,
    "delay" INTEGER NOT NULL DEFAULT 3000,
    "direction" TEXT DEFAULT 'ltr',
    "jump" BOOLEAN NOT NULL DEFAULT false,
    "hide_on_mobile" BOOLEAN NOT NULL DEFAULT false,
    "hide_on_desktop" BOOLEAN NOT NULL DEFAULT false,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "tb_layout_top_bar_configs_pkey" PRIMARY KEY ("layout_top_bar_config_id")
);

-- CreateTable
CREATE TABLE "tb_layout_top_bar_messages" (
    "layout_top_bar_message_id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "link" TEXT,
    "position" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "tb_layout_top_bar_messages_pkey" PRIMARY KEY ("layout_top_bar_message_id")
);

-- CreateTable
CREATE TABLE "tb_layout_banner_configs" (
    "layout_banner_config_id" TEXT NOT NULL,
    "layout_component_id" TEXT NOT NULL,
    "speed" INTEGER NOT NULL DEFAULT 0,
    "loop" BOOLEAN NOT NULL DEFAULT true,
    "delay" INTEGER NOT NULL DEFAULT 3000,
    "direction" TEXT DEFAULT 'ltr',
    "jump" BOOLEAN NOT NULL DEFAULT false,
    "hide_on_mobile" BOOLEAN NOT NULL DEFAULT false,
    "hide_on_desktop" BOOLEAN NOT NULL DEFAULT false,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "tb_layout_banner_configs_pkey" PRIMARY KEY ("layout_banner_config_id")
);

-- CreateTable
CREATE TABLE "tb_layout_banner_positions" (
    "layout_banner_Position_id" TEXT NOT NULL,
    "layout_banner_config_id" TEXT NOT NULL,
    "banner_id" TEXT NOT NULL,
    "position" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "tb_layout_banner_positions_pkey" PRIMARY KEY ("layout_banner_Position_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_layout_components_name_key" ON "tb_layout_components"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tb_layout_top_bar_messages_message_key" ON "tb_layout_top_bar_messages"("message");

-- AddForeignKey
ALTER TABLE "tb_layout_top_bar_configs" ADD CONSTRAINT "tb_layout_top_bar_configs_layout_component_id_fkey" FOREIGN KEY ("layout_component_id") REFERENCES "tb_layout_components"("layout_component_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_layout_banner_configs" ADD CONSTRAINT "tb_layout_banner_configs_layout_component_id_fkey" FOREIGN KEY ("layout_component_id") REFERENCES "tb_layout_components"("layout_component_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_layout_banner_positions" ADD CONSTRAINT "tb_layout_banner_positions_layout_banner_config_id_fkey" FOREIGN KEY ("layout_banner_config_id") REFERENCES "tb_layout_banner_configs"("layout_banner_config_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_layout_banner_positions" ADD CONSTRAINT "tb_layout_banner_positions_banner_id_fkey" FOREIGN KEY ("banner_id") REFERENCES "tb_banners"("banner_id") ON DELETE CASCADE ON UPDATE CASCADE;
