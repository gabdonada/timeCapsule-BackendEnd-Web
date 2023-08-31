import { FastifyInstance } from "fastify";
import { z } from "zod"
import { prisma } from "../lib/prisma";


export async function memoriesRoutes(app: FastifyInstance) {

    //Route to return memories resume
    app.get('/memories', async () => {
        const memories = await prisma.memory.findMany({
            orderBy: {
                createdAt:'asc'
            }
        });

        return memories.map(memory =>{
            return {
                id: memory.id,
                coverUrl: memory.coverUrl,
                excerpt: memory.content.substring(0, 115).concat('...')
            }
        });
    })

    //Route to get memory details by id
    app.get('/memories/:id', async (req) => {
        const paramsSchema = z.object({
            id: z.string().uuid(),
        })
        
        const { id } = paramsSchema.parse(req.params);

        const memory = await prisma.memory.findUniqueOrThrow({
            where: {
                //it is related to id above.
                id,
            }
        })

        return memory;
    })

    //Route to create a new memory
    app.post('/createMemory', async (req) => {
        const paramsSchema = z.object({
            content: z.string(),
            coverUrl: z.string(),
            //coerce convert anything else that comes to boolean (like 1,0 to true,false)
            isPublic: z.coerce.boolean().default(false)
        })

        const {content, coverUrl, isPublic} = paramsSchema.parse(req.body)

        const memory = await prisma.memory.create({
            data:{
                content,
                coverUrl,
                isPublic,
                userId: ''
            }
        })

        return memory;
    })

    //Route to update an existing memory
    app.put('/updateMemory/:id', async (req) => {
        const paramSchema = z.object({
            id: z.string().uuid()
        })

        const { id } = paramSchema.parse(req.params)
        
        const bodySchema = z.object({
            content: z.string(),
            coverUrl: z.string(),
            //coerce convert anything else that comes to boolean (like 1,0 to true,false)
            isPublic: z.coerce.boolean().default(false)
        })

        const {content, coverUrl, isPublic} = bodySchema.parse(req.body)

        const memory = await prisma.memory.update({
            where:{
                id,
            },
            data:{
                content,
                coverUrl,
                isPublic,
            }
        })

        return memory;
    })

    //Route to delete a memory
    app.delete('/deleteMemory/:id', async (req) => {
        const paramsSchema = z.object({
            id: z.string().uuid(),
        })
        
        const { id } = paramsSchema.parse(req.params);

        const memory = await prisma.memory.delete({
            where: {
                //it is related to id above.
                id,
            }
        })

        return memory;
    })
}