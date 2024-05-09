import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {  
    return prisma.university.findMany({
        select:{
            name: true,
            description: true,
            photo: true
        }
    })    
})