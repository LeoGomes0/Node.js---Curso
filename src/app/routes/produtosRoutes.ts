import { Router } from "express";
import ProdutoController from "../controllers/ProdutoController/ProdutoController";
import entradaRoutes from "./entradaRoutes";

const Route = Router();

// Rota para criar um novo produto
Route.post('/produtos', ProdutoController.createProduto);

// Rota para obter todos os produtos
Route.get('/produtos', ProdutoController.getAllProdutos);

// Rota para obter um produto pelo ID
Route.get('/produtos/:id', ProdutoController.getProdutoById);

// Rota para atualizar um produto
Route.put('/produtos/:id', ProdutoController.updateProduto);

// Rota para deletar um produto
Route.delete('/produtos/:id', ProdutoController.deleteProduto);

// Importa e usa as rotas de entrada de estoque do novo arquivo
Route.use(entradaRoutes);

export default Route;