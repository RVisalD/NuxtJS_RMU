import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { id } = event.context.params;

  const reviews = await prisma.reviews.findMany({
    where: {
      uni_id: parseInt(id),
    },
  });

  return reviews;
});
