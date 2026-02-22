import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// POST /conhecimentos
router.post("/conhecimentos", async (req, res) => {
  try {
    const { titulo, descricao, categoria, nivel, pessoaId } = req.body;

    // Verificar se a pessoa existe
    const pessoa = await prisma.pessoa.findUnique({
      where: { id: pessoaId }
    });

    if (!pessoa) {
      return res.status(400).json({ erro: "Pessoa não encontrada" });
    }

    const conhecimento = await prisma.conhecimento.create({
      data: {
        titulo,
        descricao,
        categoria,
        nivel,
        pessoaId
      }
    });

    res.json(conhecimento);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

// GET /conhecimentos
router.get("/conhecimentos", async (req, res) => {
  try {
    //Le parametros filtros enviados URL
    const { categoria, nivel} = req.query;
  
    //Filtro dinamico
    const where = {};

    if (categoria) {
      where.categoria = {
        equals: categoria,
        mode:"insensitive" // ignora Letras M ou m
      };
    }

    if (nivel){
      where.nivel = {
        equals: nivel,
        mode: "insensitive"
      };
    }

  
  const conhecimentos = await prisma.conhecimento.findMany({
    where,
    include: {
      pessoa: true
    }
  });

  res.json(conhecimentos);
  } catch (erro) {
    res.status(500) .json({erro: erro.message})
    }
});

// GET /conhecimentos/:id
router.get("/conhecimentos/:id", async (req, res) => {
  
  try {
  const id = Number(req.params.id);

  const conhecimento = await prisma.conhecimento.findUnique({
    where: { id },
    include: { pessoa: true }
  });

  if (!conhecimento) {
    return res.status(404).json({ erro: "Conhecimento não encontrado" });
  }

  res.json(conhecimento);
} catch (erro) {
  res.status(500).json({ erro: erro.message});
}
});

// PUT /conhecimentos/:id
router.put("/conhecimentos/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { titulo, descricao, categoria, nivel } = req.body;

  try {
    const conhecimento = await prisma.conhecimento.update({
      where: { id },
      data: {
        titulo,
        descricao,
        categoria,
        nivel
      }
    });

    res.json(conhecimento);
  } catch {
    res.status(404).json({ erro: "Conhecimento não encontrado" });
  }
});

// DELETE /conhecimentos/:id
router.delete("/conhecimentos/:id", async (req, res) => {
  const id = Number(req.params.id);

  try {
    await prisma.conhecimento.delete({
      where: { id }
    });

    res.json({ mensagem: "Conhecimento removido" });
  } catch {
    res.status(404).json({ erro: "Conhecimento não encontrado" });
  }
});

export default router;