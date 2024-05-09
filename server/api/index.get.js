import { PrismaClient } from '@prisma/client';
import { getQuery } from 'h3';  

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const { minPrice, maxPrice } = getQuery(event);

    let where = {};

    if (minPrice || maxPrice) {
        where.price = {};
        if (minPrice) {
            where.price.gte = parseInt(minPrice);
        }
        if (maxPrice) {
            where.price.lte = parseInt(maxPrice);
        }
    }

    const universities = await prisma.university.findMany({
        where: where
    });

    return universities;
});
