-- CreateTable
CREATE TABLE "tb_users" (
    "user_id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "password_changed_at" TIMESTAMP(0),
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "profile_id" TEXT NOT NULL,

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
    "updated_at" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "tb_users_password_recover_attempts_pkey" PRIMARY KEY ("attempt_id")
);

-- CreateTable
CREATE TABLE "tb_roles" (
    "role_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "tb_roles_pkey" PRIMARY KEY ("role_id")
);

-- CreateTable
CREATE TABLE "tb_profiles" (
    "profile_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "tb_profiles_pkey" PRIMARY KEY ("profile_id")
);

-- CreateTable
CREATE TABLE "tb_profiles_roles" (
    "profile_role_id" TEXT NOT NULL,
    "profile_id" TEXT NOT NULL,
    "role_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tb_profiles_roles_pkey" PRIMARY KEY ("profile_role_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_users_email_key" ON "tb_users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tb_users_password_recover_attempts_user_id_key" ON "tb_users_password_recover_attempts"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "tb_users_password_recover_attempts_token_key" ON "tb_users_password_recover_attempts"("token");

-- CreateIndex
CREATE UNIQUE INDEX "tb_roles_name_key" ON "tb_roles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tb_profiles_name_key" ON "tb_profiles"("name");

-- AddForeignKey
ALTER TABLE "tb_users" ADD CONSTRAINT "tb_users_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "tb_profiles"("profile_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_users_password_recover_attempts" ADD CONSTRAINT "tb_users_password_recover_attempts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "tb_users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_profiles_roles" ADD CONSTRAINT "tb_profiles_roles_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "tb_profiles"("profile_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_profiles_roles" ADD CONSTRAINT "tb_profiles_roles_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "tb_roles"("role_id") ON DELETE CASCADE ON UPDATE CASCADE;
