/*
  Warnings:

  - You are about to drop the column `descricao` on the `Pessoa` table. All the data in the column will be lost.
  - You are about to drop the column `telefone` on the `Pessoa` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Conhecimento" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Pessoa" DROP COLUMN "descricao",
DROP COLUMN "telefone",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
