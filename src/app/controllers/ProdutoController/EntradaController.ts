import prisma from "../../../prisma";
import { Request, Response } from "express"

const EntradaController = {

    registerEntrada: async (req: Request, res: Response) => {
        try {



            const id_produto = +req.params.id;
            const { quantidade, data_entrada } = req.body;

            // Verificar se os campos necessários estão presentes
            if (!id_produto || !quantidade || !data_entrada) {
                return res.status(404).json({ message: "Campos obrigatório" })
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
            console.error("Erro ao tentar registrar entrada: " + error);
            res.status(500).json({ error });
        }
    },

    getAllRegistros: async (req: Request, res: Response) => {

        try {
            const entrada = await prisma.entradas_Estoque.findMany();

            if (entrada.length === 0) {
                res.status(404).json({ message: "Não encontrato" });
            }
            res.json(entrada);

        } catch (error) {
            console.log(error)
            console.error("Erro ao buscar todos os registros");
            res.status(500).json({ error })
        }
    },

    getRegisterByID: async (req: Request, res: Response) => {

        const id_produto = +req.params.id

        try {
            const entrada = await prisma.entradas_Estoque.findFirst({
                where: {
                    id_produto
                }
            });

            if (!entrada) {
                return res.status(404).json({ message: "Id do produto não encontrado" });
            }
            res.json(entrada);

        } catch (error) {
            res.status(500).json({ error })
        }
    },

    updateRegistro: async (req: Request, res: Response) => {

        try {

            const id_entrada = +req.params.id
            const { quantidade, data_entrada } = req.body

            // Verificar se os campos necessários estão presentes
            if (!quantidade || !data_entrada) {
                return res.status(404).json({ message: "Campos obrigatórios" })
            }

            const entrada = await prisma.entradas_Estoque.findFirst({
                where: {
                    id_entrada
                }
            });

            // Caso as informações do entrada seja nulo, irá retornar a mensagem de erro
            if (!entrada) {
                return res.status(404).json({ message: "Registro não encontrado" })
            }

            await prisma.entradas_Estoque.update({
                where: {
                    id_entrada
                },

                data: {
                    quantidade,
                    data_entrada
                },
            });
            res.json({ message: "Produto atualizado com sucesso" });

    } catch(error) {
        console.error("Erro ao tentar atualizar os registros");
        res.status(500).json({ error });
    }
},
};

export default EntradaController;
