/*
  Warnings:

  - You are about to drop the column `token` on the `tb_users_password_recover_attempts` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "tb_users_password_recover_attempts_token_key";

-- AlterTable
ALTER TABLE "tb_users_password_recover_attempts" DROP COLUMN "token";

-- CreateTable
CREATE TABLE "tb_vehicles" (
    "vehicle_id" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "description" TEXT,
    "price" DECIMAL(10,2),
    "mileage" INTEGER,
    "color" TEXT,
    "transmission" TEXT,
    "fuel_type" TEXT,
    "doors" INTEGER,
    "seats" INTEGER,
    "horsepower" INTEGER,
    "torque" INTEGER,
    "drive_train" TEXT,
    "brand_id" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "tb_vehicles_pkey" PRIMARY KEY ("vehicle_id")
);

-- CreateTable
CREATE TABLE "tb_vehicles_images" (
    "vehicle_image_id" TEXT NOT NULL,
    "vehicle_id" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tb_vehicles_images_pkey" PRIMARY KEY ("vehicle_image_id")
);

-- CreateTable
CREATE TABLE "tb_vehicles_features" (
    "vehicle_feature_id" TEXT NOT NULL,
    "vehicle_id" TEXT NOT NULL,
    "feature" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "tb_vehicles_features_pkey" PRIMARY KEY ("vehicle_feature_id")
);

-- AddForeignKey
ALTER TABLE "tb_vehicles" ADD CONSTRAINT "tb_vehicles_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "tb_brands"("brand_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_vehicles" ADD CONSTRAINT "tb_vehicles_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "tb_categories"("category_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_vehicles_images" ADD CONSTRAINT "tb_vehicles_images_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "tb_vehicles"("vehicle_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_vehicles_features" ADD CONSTRAINT "tb_vehicles_features_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "tb_vehicles"("vehicle_id") ON DELETE CASCADE ON UPDATE CASCADE;
