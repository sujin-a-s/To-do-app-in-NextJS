/*
  Warnings:

  - Added the required column `forgotPasswordToken` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `forgotPasswordTokenExpiry` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `verifyToken` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `verifyTokenExpiry` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "forgotPasswordToken" TEXT NOT NULL,
ADD COLUMN     "forgotPasswordTokenExpiry" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "isAdmin" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "verifyToken" TEXT NOT NULL,
ADD COLUMN     "verifyTokenExpiry" TIMESTAMP(3) NOT NULL;
