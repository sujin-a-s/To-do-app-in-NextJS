/*
  Warnings:

  - You are about to drop the column `forgotPasswordToken` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `forgotPasswordTokenExpiry` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `verifyToken` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `verifyTokenExpiry` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "forgotPasswordToken",
DROP COLUMN "forgotPasswordTokenExpiry",
DROP COLUMN "verifyToken",
DROP COLUMN "verifyTokenExpiry";
