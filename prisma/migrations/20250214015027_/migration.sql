-- CreateTable
CREATE TABLE "tb_users" (
    "user_id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "password_changed_at" TIMESTAMP(0),
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL,
    "updated_at" TIMESTAMP(0),
    "updated_by" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "tb_users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "tb_users_password_recover_attempts" (
    "attempt_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "attempt_count" INTEGER NOT NULL DEFAULT 1,
    "last_attempt_at" TIMESTAMP(0) NOT NULL,
    "blocked_until" TIMESTAMP(0),
    "token" TEXT NOT NULL,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0),

    CONSTRAINT "tb_users_password_recover_attempts_pkey" PRIMARY KEY ("attempt_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_users_email_key" ON "tb_users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tb_users_password_recover_attempts_user_id_key" ON "tb_users_password_recover_attempts"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "tb_users_password_recover_attempts_token_key" ON "tb_users_password_recover_attempts"("token");

-- AddForeignKey
ALTER TABLE "tb_users_password_recover_attempts" ADD CONSTRAINT "tb_users_password_recover_attempts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "tb_users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
