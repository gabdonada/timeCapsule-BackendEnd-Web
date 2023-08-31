import { PrismaClient } from '@prisma/client';


export const prisma = new PrismaClient({
    //Use it to log all DB interactions
    log: ['query']
});
