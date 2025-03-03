-- CreateTable
CREATE TABLE "tb_sellers" (
    "seller_id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "image_url" TEXT,
    "custom_message" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "tb_sellers_pkey" PRIMARY KEY ("seller_id")
);

-- CreateTable
CREATE TABLE "tb_banners" (
    "banner_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "image_desktop_url" TEXT NOT NULL,
    "image_mobile_url" TEXT NOT NULL,
    "start_at" TIMESTAMP(0),
    "end_at" TIMESTAMP(0),
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "tb_banners_pkey" PRIMARY KEY ("banner_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_sellers_email_key" ON "tb_sellers"("email");
