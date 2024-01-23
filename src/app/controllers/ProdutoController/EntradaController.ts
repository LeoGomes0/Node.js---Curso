import prisma from "../../../prisma";
import { Request, Response } from "express"

const EntradaController = {


    // Adicionar um registro / novo registro
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


    // Realizar a busca de todos os registros
    getAllRegistros: async (req: Request, res: Response) => {

        try {
            const entrada = await prisma.entradas_Estoque.findMany();

            if (entrada.length === 0) {
                res.status(404).json({ message: "Não encontrato" });
            }
            res.json(entrada);

        } catch (error) {
            console.log(error)
            console.error("Erro ao buscar todos os registros de entradas");
            res.status(500).json({ error })
        }
    },


    // Realizar a busca dos registros através do ID
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


    // Atualização dos Registros
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
                return res.status(404).json({ message: "Registros de entradas não encontrado" })
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

        } catch (error) {
            console.error("Erro ao tentar atualizar as entradas");
            res.status(500).json({ error });
        }
    },


    // Deletar algum registro
    deleteRegister: async (req: Request, res: Response) => {

        try {

            const id_entrada = +req.params.id

            if (!id_entrada) {
                return res.status(404).json({ message: "ID do produto não encontrado" });
            }
            const entrada = await prisma.entradas_Estoque.findFirst({
                where: {
                    id_entrada
                }
            });

            if (!entrada) {
                return res.status(404).json({ message: "Entrada não encontrada" });
            }

            await prisma.entradas_Estoque.delete({
                where: {
                    id_entrada
                }
            });
            res.json({ message: "Registro de entradas deletado" });

        } catch (error) {
            console.error("Erro ao tentar deletar as entradas")
            res.status(500).json({ error })
        }
    }
}

export default EntradaController;
