import { Router } from "express";
import pessoaRoutes from "./pessoa.routes.js";
import conhecimentoRoutes from "./conhecimento.routes.js";
import authRoutes from "./auth.routes.js"; 

const routes = Router();

routes.use(authRoutes);        
routes.use(pessoaRoutes);
routes.use(conhecimentoRoutes);

export default routes;
