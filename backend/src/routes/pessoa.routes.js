const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// POST /pessoas
router.post('/', async (req, res) => {
  const { nome, email, telefone, descricao } = req.body;

  try {
    const pessoa = await prisma.pessoa.create({
      data: { nome, email, telefone, descricao }
    });

    res.status(201).json(pessoa);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET /pessoas
router.get('/', async (req, res) => {
  const pessoas = await prisma.pessoa.findMany();
  res.json(pessoas);
});

// GET /pessoas/:id
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const pessoa = await prisma.pessoa.findUnique({
    where: { id: Number(id) }
  });

  if (!pessoa) {
    return res.status(404).json({ error: "Pessoa não encontrada" });
  }

  res.json(pessoa);
});

// PUT /pessoas/:id
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, email, telefone, descricao } = req.body;

  try {
    const pessoa = await prisma.pessoa.update({
      where: { id: Number(id) },
      data: { nome, email, telefone, descricao }
    });

    res.json(pessoa);
  } catch (error) {
    res.status(404).json({ error: "Pessoa não encontrada" });
  }
});

// DELETE /pessoas/:id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.pessoa.delete({
      where: { id: Number(id) }
    });

    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: "Pessoa não encontrada" });
  }
});

module.exports = router;
