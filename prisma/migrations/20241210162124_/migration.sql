/*
  Warnings:

  - Added the required column `wallet_id` to the `WishlistTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `WishlistTransaction` ADD COLUMN `wallet_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `WishlistTransaction` ADD CONSTRAINT `WishlistTransaction_wallet_id_fkey` FOREIGN KEY (`wallet_id`) REFERENCES `Wallet`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
