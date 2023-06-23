import fastify from 'fastify';
import { PrismaClient } from '@prisma/client';

//fastify instead of Express due security, easy to use and so on
const app = fastify();
const prisma = new PrismaClient();

app.get('/Users', async () => {
    const user = await prisma.user.findMany();

    return user
})

app.listen({
    port: 3333,
}).then(()=>{
    console.log("HHTP server running on 3333")
}).catch((err)=>{
    console.error(`HHTP server issue: ${err}`)
})
