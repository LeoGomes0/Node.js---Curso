import { Router } from "express";
import EntradaController from "../controllers/ProdutoController/EntradaController";

const Route = Router();

// Rota para registrar entrada de estoque
Route.post('/produtos/:id/entrada', EntradaController.registerEntrada);

export default Route