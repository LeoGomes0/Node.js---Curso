import { Router } from "express";
import EntradaController from "../controllers/ProdutoController/EntradaController";

const router = Router();

// Rota para registrar entrada de estoque
router.post('produtos/:id/entrada', EntradaController.registerEntrada);

export default router;