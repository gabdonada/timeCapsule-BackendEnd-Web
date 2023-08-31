import fastify from 'fastify';
import { memoriesRoutes } from './routes/memories';
import cors from '@fastify/cors';

//fastify instead of Express due security, easy to use and so on
const app = fastify();

app.register(cors,{
    origin: true, //origin true all frontend envs can access it
    //We may limit the exact url that will access it.
})
app.register(memoriesRoutes)

app.listen({
    port: 3333,
}).then(()=>{
    console.log("HHTP server running on 3333")
}).catch((err)=>{
    console.error(`HHTP server issue: ${err}`)
})
