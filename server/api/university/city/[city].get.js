import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { city } = event.context.params;
  
  const universities = await prisma.university.findMany({
    where: {
      city: city,
    },
  });
  return universities
});
