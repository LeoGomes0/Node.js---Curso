import { Router } from "express";
import ProdutoController from "../controllers/ProdutoController/ProdutoController";

const Route = Router();

Route.post('/produtos', ProdutoController.createProduto);

Route.get('/produtos', ProdutoController.getAllProdutos);

Route.get('/produtos/:id', ProdutoController.getProdutoById);

Route.put('/produtos/:id', ProdutoController.updateProduto);

Route.delete('/produtos/:id', ProdutoController.deteleProduto);

export default Route;