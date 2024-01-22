import prisma from "../../../prisma";
import { Request, Response } from "express"

const EntradaController = {

    registerEntrada: async (req: Request, res: Response) => {
        try {

            const { id_produto, quantidade, data_entrada } = req.body;

            // Verificar se os campos necessários estão presentes
            if (!id_produto || !quantidade || !data_entrada) {
                return res.status(400).json({ message: "Campos obrigatório" })
            }

            const entrada = await prisma.entradas_Estoque.create({
                data: {
                    id_produto,
                    quantidade,
                    data_entrada
                }
            });
            res.json(entrada);

        } catch (error) {
            res.status(500).json({ message: 'Erro ao registrar entrada no estoque' });
        }
    }

};

export default EntradaController;
