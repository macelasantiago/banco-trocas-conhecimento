// Funções utilitárias para padronizar TODAS as respostas da API

export const success = (res, data, statusCode = 200) => {
  return res.status(statusCode).json({
    sucesso: true,
    dados: data
  });
};

export const created = (res, data) => {
  return res.status(201).json({
    sucesso: true,
    dados: data
  });
};

export const notFound = (res, mensagem = "Recurso não encontrado") => {
  return res.status(404).json({
    sucesso: false,
    erro: mensagem
  });
};

export const badRequest = (res, mensagem = "Dados inválidos") => {
  return res.status(400).json({
    sucesso: false,
    erro: mensagem
  });
};

export const serverError = (res, mensagem = "Erro interno do servidor") => {
  return res.status(500).json({
    sucesso: false,
    erro: mensagem
  });
};