import { Router } from "express";
import EntradaController from "../controllers/ProdutoController/EntradaController";

const Route = Router();

// Rota para registrar entrada de estoque, utilizando ID do produto
Route.post('/entrada/:id', EntradaController.registerEntrada);

// Rota para obter todos os registros das entradas
Route.get('/entrada', EntradaController.getAllRegistros);

// Rota para obter um registro de entrada pelo ID do Produto
Route.get('/entrada/:id', EntradaController.getRegisterEntradaByID);

// Rota para atualizar um registro de entrada
Route.put('/entrada/:id', EntradaController.updateRegistroEntrada);

// Rota para deletar um registro de entrada 
Route.delete('/entrada/:id', EntradaController.deleteRegisterEntrada);


export default Route