import { Router } from "express";
import EntradaController from "../controllers/ProdutoController/EntradaController";

const Route = Router();

// Rota para registrar entrada de estoque
Route.post('/entrada/:id', EntradaController.registerEntrada);
Route.get('/entrada', EntradaController.getAllRegistros);
Route.get('/entrada/:id', EntradaController.getRegisterByID);
Route.put('/entrada/:id', EntradaController.updateRegistro);
Route.delete('/entrada/:id', EntradaController.deleteRegister);


export default Route