import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { type } = event.context.params;
  
  const filteredUniversity = await prisma.university.findMany({
    where: {
      type: type
    }
  });
  return filteredUniversity;
});


