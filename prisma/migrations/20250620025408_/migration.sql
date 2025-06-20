-- CreateTable
CREATE TABLE "tb_top_bar_messages" (
    "top_bar_message_id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "link" TEXT,
    "position" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "tb_top_bar_messages_pkey" PRIMARY KEY ("top_bar_message_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_top_bar_messages_message_key" ON "tb_top_bar_messages"("message");
