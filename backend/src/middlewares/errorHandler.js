// Este middleware captura QUALQUER erro não tratado da aplicação
// Deve ser o ÚLTIMO middleware registrado no server.js

export const errorHandler = (err, _req, res, next) => {
  console.error("❌ Erro capturado pelo middleware:", err);

  // Erros do Prisma — mapeamento dos códigos mais comuns
  if (err.code === "P2002") {
    return res.status(409).json({
      sucesso: false,
      erro: "Já existe um registro com esse dado único (ex: e-mail duplicado)"
    });
  }

  if (err.code === "P2025") {
    return res.status(404).json({
      sucesso: false,
      erro: "Registro não encontrado no banco de dados"
    });
  }

  if (err.code === "P2003") {
    return res.status(400).json({
      sucesso: false,
      erro: "Referência inválida — verifique se o ID relacionado existe"
    });
  }

  // Erro genérico — nunca exponha a stack em produção
  const status = err.status || 500;
  const mensagem = err.message || "Erro interno do servidor";

  res.status(status).json({
    sucesso: false,
    erro: mensagem
  });
};