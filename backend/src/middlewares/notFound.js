// Captura qualquer rota que não existe na API
export const notFoundHandler = (req, res) => {
  res.status(404).json({
    sucesso: false,
    erro: `Rota '${req.method} ${req.originalUrl}' não encontrada`
  });
};