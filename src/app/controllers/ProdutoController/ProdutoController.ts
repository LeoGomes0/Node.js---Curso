import prisma from "../../../prisma";
import { Request, Response } from "express";

const ProdutoController = {

    createProduto: async (req: Request, res: Response) => {
        try {
            const novoProduto = await prisma.produtos.create({
                data: {
                    nome_produto: req.body.nome_produto,
                    descricao: req.body.descricao,
                    preco_unitario: req.body.preco_unitario
                }
            });
            res.json(novoProduto);
        } catch (error) {
            res.status(500).send(error);
        }
    },

    getAllProdutos: async (req: Request, res: Response) => {
        try {
            const produtos = await prisma.produtos.findMany();
            res.json(produtos);
            // validação da busca, caso não consiga encontrar, vai mostrar o status do erro e a mensagem em Json
            if (produtos.length === 0) {
                return res.status(404).json({ message: 'produto não encontrado!' })
            }
        } catch (error) {
            res.status(500).send({ message: 'Erro ao buscar produtos' });
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
            await prisma.produtos.update({
                where: {
                    id_produto: +req.params.id
                },
                data: {
                    nome_produto: req.body.nome_produto,
                    descricao: req.body.descricao,
                    preco_unitario: req.body.preco_unitario
                }
            });
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