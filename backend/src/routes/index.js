import { Router } from "express";
import pessoaRoutes from "./pessoa.routes.js";
import conhecimentoRoutes from "./conhecimento.routes.js";

const routes = Router();

routes.use(pessoaRoutes);
routes.use(conhecimentoRoutes);

export default routes;
