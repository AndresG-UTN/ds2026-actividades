-- CreateTable
CREATE TABLE "Categoria" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CategoriaToLibro" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CategoriaToLibro_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Categoria_nombre_key" ON "Categoria"("nombre");

-- CreateIndex
CREATE INDEX "_CategoriaToLibro_B_index" ON "_CategoriaToLibro"("B");

-- AddForeignKey
ALTER TABLE "_CategoriaToLibro" ADD CONSTRAINT "_CategoriaToLibro_A_fkey" FOREIGN KEY ("A") REFERENCES "Categoria"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoriaToLibro" ADD CONSTRAINT "_CategoriaToLibro_B_fkey" FOREIGN KEY ("B") REFERENCES "Libro"("id") ON DELETE CASCADE ON UPDATE CASCADE;
