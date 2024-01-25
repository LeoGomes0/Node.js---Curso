import { Router } from "express";
import SaidaController from "../controllers/ProdutoController/SaidaController";

const Route = Router();

// Rota para registrar saída de estoque, utilizando ID do produto
Route.post('/saida/:id', SaidaController.registerSaida);

// Rota para obter todos os registros das saídas
Route.get('/saida', SaidaController.getAllRegistrosSaida);

// Rota para obter um registro de saida pelo ID do Produto
Route.get('/saida/:id', SaidaController.getRegisterSaidaByID)

// Rota para atualizar um registro de saida pelo ID da saida
Route.put('/saida/:id', SaidaController.updateRegistroSaida);

// Rota para deletar um registro de saida 
Route.delete('/saida/:id', SaidaController.deleteRegisterSaida);

export default Route;