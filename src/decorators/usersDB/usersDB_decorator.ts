import fastifyPlugin from "fastify-plugin";
import { UsuariosDB } from "../../services/usuarios_db_service";

export default fastifyPlugin(async function(fastify){
    fastify.decorate("UsersDB", new UsuariosDB(fastify))
})

declare module 'fastify'{
    interface FastifyInstance {
        UsersDB: UsuariosDB
    }
}