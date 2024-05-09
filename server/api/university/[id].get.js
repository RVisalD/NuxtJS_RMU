import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler( async (event) => {
  const { id } = event.context.params;

  const university = await prisma.university.findUnique({
    where: {
      id: parseInt(id)
    }
  });

  if(!university){
    throw createError({
      statusCode: 404,
      statusMessage: 'There is no university with the given id.'
    });
  }

  return university
});
