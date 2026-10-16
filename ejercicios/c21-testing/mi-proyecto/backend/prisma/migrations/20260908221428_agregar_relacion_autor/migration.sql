/*
  Warnings:

  - You are about to drop the column `autor` on the `Libro` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nombre]` on the table `Autor` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `autorId` to the `Libro` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Libro" DROP COLUMN "autor",
ADD COLUMN     "autorId" INTEGER NOT NULL,
ALTER COLUMN "disponible" SET DEFAULT true;

-- CreateIndex
CREATE UNIQUE INDEX "Autor_nombre_key" ON "Autor"("nombre");

-- AddForeignKey
ALTER TABLE "Libro" ADD CONSTRAINT "Libro_autorId_fkey" FOREIGN KEY ("autorId") REFERENCES "Autor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
