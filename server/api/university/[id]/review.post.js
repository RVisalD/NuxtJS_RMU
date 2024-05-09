import Joi from "joi";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const schema = Joi.object({
  review: Joi.string().required(),
});

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { id } = event.context.params;

  const { error } = schema.validate(body);
  if (error) {
    throw createError({
      statusCode: 412,
      statusMessage: error.message,
    });
  }

  const { review, uni_id} = body;
  const reviews = await prisma.reviews.create({
    data: {
      review,
      uni_id: parseInt(id),
    },
  });

  return reviews
});
