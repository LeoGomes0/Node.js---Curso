import { Router } from "express";
import SaidaController from "../controllers/ProdutoController/SaidaController";

const Route = Router();

// Rota para registrar saída de estoque
Route.post('/saida', SaidaController.registerSaida);


export default Route;