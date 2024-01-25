import prisma from "../../../prisma";
import { Request, Response } from "express"

const EntradaController = {


    // Adicionar registro / novo registro
    registerEntrada: async (req: Request, res: Response) => {
        try {

            const id_produto = +req.params.id;
            const { quantidade, data_entrada } = req.body;

            // Verificar se os campos necessários estão presentes
            if (!id_produto || !quantidade || !data_entrada) {
                return res.status(404).json({ message: "Campos obrigatório" });
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
                res.status(404).json({ message: "Registro de entrada não encontrato" });
            }
            res.json(entrada);

        } catch (error) {

            console.error("Erro ao buscar todos os registros de entradas");
            res.status(500).json({ error })
        }
    },


    // Realizar a busca dos registros através do ID
    getRegisterEntradaByID: async (req: Request, res: Response) => {
        try {

            const id_produto = +req.params.id

            
            const entrada = await prisma.entradas_Estoque.findFirst({
                where: {
                    id_produto
                }
            });

            if (!entrada) {
                return res.status(404).json({ message: "ID do produto não encontrado" });
            }
            res.json(entrada);

        } catch (error) {
            console.error("Erro ao buscar registro de saida pelo ID do produto");
            res.status(500).json({ error });
        }
    },


    // Atualização dos Registros
    updateRegistroEntrada: async (req: Request, res: Response) => {
        try {

            const id_entrada = +req.params.id
            const { quantidade, data_entrada } = req.body

            // Verificar se os campos necessários estão presentes
            if (!quantidade || !data_entrada) {
                return res.status(404).json({ message: "Campos obrigatórios" });
            }

            const entrada = await prisma.entradas_Estoque.findFirst({
                where: {
                    id_entrada
                }
            });

            // Caso as informações do entrada seja nulo, irá retornar a mensagem de erro
            if (!entrada) {
                return res.status(404).json({ message: "Registros de entradas não encontrado" });
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
            res.json({ message: "Registro de entrada realizado com sucesso" });

        } catch (error) {
            console.error("Erro ao tentar atualizar as entradas");
            res.status(500).json({ error });
        }
    },


    // Deletar algum registro
    deleteRegisterEntrada: async (req: Request, res: Response) => {

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
                return res.status(404).json({ message: "Registro de entrada não encontrada" });
            }

            await prisma.entradas_Estoque.delete({
                where: {
                    id_entrada
                }
            });
            res.json({ message: "Registro de entradas deletado" });

        } catch (error) {
            console.error("Erro ao tentar deletar registro de entradas");
            res.status(500).json({ error });
        }
    }
}

export default EntradaController;
