import { Router } from "express";
import pessoaRoutes from "./pessoa.routes.js";

const routes = Router();

routes.use(pessoaRoutes);

export default routes;
