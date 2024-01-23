import prisma from "../../../prisma";
import { Request, Response } from "express";

const SaidaController = {

    registerSaida: async (req: Request, res: Response) => {

        try {

            const id_produto = +req.params.id;
            const { quantidade, data_saida } = req.body;

            if (!quantidade || !data_saida || !id_produto) {
                return res.status(400).json({ message: ("Campo obrigatório") })
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
    }
}

export default SaidaController;