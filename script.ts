import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    // ... você escreverá suas consultas do cliente Prisma aqui
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })