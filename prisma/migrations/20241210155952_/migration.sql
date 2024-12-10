/*
  Warnings:

  - Added the required column `initial_balance` to the `Wallet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Wallet` ADD COLUMN `initial_balance` INTEGER NOT NULL;
