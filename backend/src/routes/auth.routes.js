import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = Router();
const prisma = new PrismaClient();

// POST /auth/registro — Cadastrar pessoa com senha
router.post("/auth/registro", async (req, res) => {
  try {
    const { nome, email, telefone, descricao, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ erro: "Nome, email e senha são obrigatórios" });
    }

    // Verifica se email já está cadastrado
    const emailExiste = await prisma.pessoa.findUnique({ where: { email } });
    if (emailExiste) {
      return res.status(400).json({ erro: "E-mail já cadastrado" });
    }

    // Criptografa a senha (nunca salve senha em texto puro)
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const pessoa = await prisma.pessoa.create({
      data: { nome, email, telefone, descricao, senha: senhaCriptografada }
    });

    // Não retorna a senha na resposta
    const { senha: _, ...pessoaSemSenha } = pessoa;
    res.status(201).json(pessoaSemSenha);

  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

// POST /auth/login — Login e geração do token
router.post("/auth/login", async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ erro: "Email e senha são obrigatórios" });
    }

    // Busca a pessoa pelo email
    const pessoa = await prisma.pessoa.findUnique({ where: { email } });
    if (!pessoa) {
      return res.status(401).json({ erro: "Email ou senha incorretos" });
    }

    // Compara a senha enviada com a senha criptografada do banco
    const senhaCorreta = await bcrypt.compare(senha, pessoa.senha);
    if (!senhaCorreta) {
      return res.status(401).json({ erro: "Email ou senha incorretos" });
    }

    // Gera o token JWT com os dados da pessoa
    const token = jwt.sign(
      { id: pessoa.id, nome: pessoa.nome },
      process.env.JWT_SECRET,
      { expiresIn: "8h" } // Token válido por 8 horas
    );

    res.json({
      mensagem: "Login realizado com sucesso",
      token,
      pessoa: { id: pessoa.id, nome: pessoa.nome, email: pessoa.email }
    });

  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

export default router;