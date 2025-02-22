-- CreateTable
CREATE TABLE "tb_brands" (
    "brand_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "tb_brands_pkey" PRIMARY KEY ("brand_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_brands_name_key" ON "tb_brands"("name");
