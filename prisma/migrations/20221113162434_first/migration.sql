-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "first" VARCHAR(40),
    "last" VARCHAR(40),
    "password" VARCHAR(128) NOT NULL,
    "email" VARCHAR(60) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
