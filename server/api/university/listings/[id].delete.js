import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {  
    return prisma.university.delete({
        where:{
            id: parseInt(event.context.params.id)
        }
    })    
})

