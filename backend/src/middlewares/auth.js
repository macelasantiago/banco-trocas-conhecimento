import jwt from "jsonwebtoken";

export const autenticar = (req, res, next) => {
  // Pega o token do header Authorization: Bearer <token>
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ erro: "Token não fornecido" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Valida e decodifica o token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Injeta os dados do usuário na requisição
    req.pessoaId = decoded.id;
    req.pessoaNome = decoded.nome;

    next(); // Pode continuar para a rota
  } catch {
    return res.status(401).json({ erro: "Token inválido ou expirado" });
  }
};