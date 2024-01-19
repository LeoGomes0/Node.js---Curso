import prisma from "../../../prisma";
import { Request, Response } from "express";

const ProdutoController = {

    createProduto: async (req: Request, res: Response) => {
        try {
            const novoProduto = await prisma.produtos.create(req.body);
            res.json(novoProduto);
        } catch (error) {
            res.status(500).send(error);
        }
    },

    getAllProdutos: async (req: Request, res: Response) => {
        try {
            const produtos = await prisma.produtos.findMany();
            res.json(produtos);
        } catch (error) {
            res.status(500).send(error);
        }
    },

    getProdutoById: async (req: Request, res: Response) => {
        try {
            const produto = await prisma.produtos.findUnique({
                where: {
                    id_produto: +req.params.id
                }
            });
            if (!produto) {
                return res.status(404).send('Produto não encontrado');
            }
            res.json(produto);
        } catch (error) {
            res.status(500).send(error);
        }
    },

    updateProduto: async (req: Request, res: Response) => {
        try {
            const produto = await prisma.produtos.findUnique({
                where: {
                    id_produto: +req.params.id
                }
            })
            if (!produto) {
                return res.status(404).send('Produto não encontrado');
            }
            await prisma.produtos.update(req.body);
            res.send('Produto atualizado com sucesso');
        } catch (error) {
            res.status(500).send(error);
        }
    },

    deteleProduto: async (req: Request, res: Response) => {
        try {
            const produto = await prisma.produtos.findUnique({
                where: {
                    id_produto: +req.params.id
                }
            });
            if (!produto) {
                return res.status(404).send('Produto não encontrato');
            }
            prisma.produtos.delete;
            res.send('Produto deletado com sucesso');
        } catch (error) {
            res.status(500).send(error);
        }
    }

}

export default ProdutoController;