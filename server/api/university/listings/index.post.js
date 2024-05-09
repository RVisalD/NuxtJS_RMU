import Joi from "joi";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const schema = Joi.object({
  name: Joi.string().required(),
  type: Joi.string().required(),
  description: Joi.string().required(),
  city: Joi.string().required(),
  photo: Joi.string().required(),
  price: Joi.number().min(1).required(),
});

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { error } = schema.validate(body);

    if (error) {
      throw createError({
        statusCode: 412,
        statusMessage: error.message,
      });
    }

    const { name, type, description, city, photo, price } = body;

    const university = await prisma.university.create({
      data: {
        name,
        type,
        description,
        city,
        photo,
        price: parseFloat(price),
      },
    });

    return university;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message || "Internal Server Error",
    });
  }
});
