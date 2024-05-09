import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { id } = event.context.params;
  return prisma.reviews.findMany({
    where: {
      uni_id: parseInt(id),
    },
  });
});
