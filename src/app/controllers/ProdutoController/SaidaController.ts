import prisma from "../../../prisma";
import { Request, Response } from "express";

const SaidaController = {

    // Adicionar registro de saida / novo registro de saida 
    registerSaida: async (req: Request, res: Response) => {

        try {

            const id_produto = +req.params.id;
            const { quantidade, data_saida } = req.body;

            if (!quantidade || !data_saida || !id_produto) {
                return res.status(400).json({ message: ("Campo obrigatório") });
            }

            const saida = await prisma.saidas_Estoque.create({
                data: {
                    id_produto,
                    quantidade,
                    data_saida
                }
            });
            res.json(saida);

        } catch (error) {
            console.error("Erro ao tentar registrar saída: " + error)
            res.status(500).json({ error });
        }
    },

    getAllRegistrosSaida: async (req: Request, res: Response) => {
        try {

            const saida = await prisma.saidas_Estoque.findMany();

            if (saida.length === 0) {
                return res.status(404).json({ message: "Registro da Saída não encontrada" });
            }
            res.json(saida);

        } catch (error) {
            console.error("Erro ao buscar todos os registros de saidas");
            res.status(500).json({ error })
        }
    },

    getRegisterSaidaByID: async (req: Request, res: Response) => {
        try {

            const id_produto = +req.params.id

            const saida = await prisma.saidas_Estoque.findFirst({
                where: {
                    id_produto
                }
            });

            if (!saida) {
                return res.status(404).json({ message: " ID do produto não encontrado" });
            }
            res.json(saida);
        } catch (error) {
            console.error("Erro ao buscar registro de saida pelo ID do produto");
            res.status(500).json({ error })
        }
    },

    updateRegistroSaida: async (req: Request, res: Response) => {
        try {

            const id_saida = +req.params.id
            const { quantidade, data_saida } = req.body

            if (!quantidade || !data_saida) {
                return res.status(404).json({ message: "Registro de saidas não encontrado" });
            }

            const saida = await prisma.saidas_Estoque.findFirst({
                where: {
                    id_saida
                }
            })

            if (!saida) {
                return res.status(404).json({ message: "Registros de saídas não encontrado" });
            }

            await prisma.saidas_Estoque.update({

                where: {
                    id_saida

                },
                data: {
                    quantidade,
                    data_saida
                }
            })
            res.json({ message: "Registro de atualização realizado com sucesso" })
        } catch (error) {
            console.error("Erro ao tentar atualizar as saídas")
            res.status(500).json({ error });
        }
    },

    deleteRegisterSaida: async (req: Request, res: Response) => {
        try {

            const id_saida = +req.params.id

            const saida = await prisma.saidas_Estoque.findFirst({
                where: {
                    id_saida
                }
            });

            if (!saida) {
                return res.status(404).json({ message: "Registro de saida não encontrada" });
            }

            await prisma.saidas_Estoque.delete({
                where: {
                    id_saida
                }
            })
            res.json({ message: "Registro de saida deletado" });
        } catch (error) {
            console.error("Erro ao tentar deletar registro de saidas");
            res.status(500).json({ error });
        }
    }

}

export default SaidaController;