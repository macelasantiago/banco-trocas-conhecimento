import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { autenticar } from "../middlewares/auth.js";

const router = Router();
const prisma = new PrismaClient();

// POST /conhecimentos — protegido, pessoaId vem do token
router.post("/conhecimentos", autenticar, async (req, res) => {
  try {
    const { titulo, descricao, categoria, nivel } = req.body;

    // pessoaId vem do token JWT, não do body
    const pessoaId = req.pessoaId;

    const conhecimento = await prisma.conhecimento.create({
      data: { titulo, descricao, categoria, nivel, pessoaId }
    });

    res.status(201).json(conhecimento);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

// GET /conhecimentos — público, com filtros avançados
router.get("/conhecimentos", async (req, res) => {
  try {
    const { categoria, nivel, busca } = req.query;

    const where = {};

    // Filtro por categoria
    if (categoria) {
      where.categoria = {
        equals: categoria,
        mode: "insensitive"
      };
    }

    // Filtro por nível
    if (nivel) {
      where.nivel = {
        equals: nivel,
        mode: "insensitive"
      };
    }

    // Busca por título OU descrição
    if (busca) {
      where.OR = [
        { titulo:    { contains: busca, mode: "insensitive" } },
        { descricao: { contains: busca, mode: "insensitive" } }
      ];
    }

    const conhecimentos = await prisma.conhecimento.findMany({
      where,
      include: {
        pessoa: {
          select: { id: true, nome: true, email: true }
        }
      },
      orderBy: { id: "desc" }
    });

    res.json(conhecimentos);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

// GET /conhecimentos/:id — público
router.get("/conhecimentos/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ erro: "ID inválido. Deve ser um número." });
    }

    const conhecimento = await prisma.conhecimento.findUnique({
      where: { id },
      include: { pessoa: true }
    });

    if (!conhecimento) {
      return res.status(404).json({ erro: "Conhecimento não encontrado" });
    }

    res.json(conhecimento);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

// PUT /conhecimentos/:id — protegido + verifica se é o dono
router.put("/conhecimentos/:id", autenticar, async (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ erro: "ID inválido" });
  }

  const { titulo, descricao, categoria, nivel } = req.body;

  try {
    // Busca o conhecimento para verificar o dono antes de editar
    const existente = await prisma.conhecimento.findUnique({ where: { id } });

    if (!existente) {
      return res.status(404).json({ erro: "Conhecimento não encontrado" });
    }

    // Bloqueia se quem tenta editar não for o dono
    if (existente.pessoaId !== req.pessoaId) {
      return res.status(403).json({ erro: "Você não tem permissão para editar essa oferta" });
    }

    const conhecimento = await prisma.conhecimento.update({
      where: { id },
      data: { titulo, descricao, categoria, nivel }
    });

    res.json(conhecimento);
  } catch (erro) {
    if (erro.code === "P2025") {
      return res.status(404).json({ erro: "Conhecimento não encontrado" });
    }
    res.status(500).json({ erro: erro.message });
  }
});

// DELETE /conhecimentos/:id — protegido + verifica se é o dono
router.delete("/conhecimentos/:id", autenticar, async (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ erro: "ID inválido" });
  }

  try {
    // Busca o conhecimento para verificar o dono antes de deletar
    const existente = await prisma.conhecimento.findUnique({ where: { id } });

    if (!existente) {
      return res.status(404).json({ erro: "Conhecimento não encontrado" });
    }

    // Bloqueia se quem tenta deletar não for o dono
    if (existente.pessoaId !== req.pessoaId) {
      return res.status(403).json({ erro: "Você não tem permissão para excluir essa oferta" });
    }

    await prisma.conhecimento.delete({ where: { id } });

    res.json({ mensagem: "Conhecimento removido" });
  } catch (erro) {
    if (erro.code === "P2025") {
      return res.status(404).json({ erro: "Conhecimento não encontrado" });
    }
    res.status(500).json({ erro: erro.message });
  }
});

export default router;