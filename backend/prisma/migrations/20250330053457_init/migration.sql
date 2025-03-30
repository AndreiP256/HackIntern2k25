-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ROLE1', 'ROLE2');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nume" TEXT NOT NULL,
    "prenume" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'ROLE1',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_nume_prenume_key" ON "User"("nume", "prenume");
