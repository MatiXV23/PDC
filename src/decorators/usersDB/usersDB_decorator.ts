import fastifyPlugin from "fastify-plugin";
import { UsuariosDB } from "../../services/usuarios_db_service.ts";
import { myPool } from "../../services/db_service.ts";
export default fastifyPlugin(async function(fastify){
    fastify.decorate("UsersDB", new UsuariosDB(myPool))
})

declare module 'fastify'{
    interface FastifyInstance {
        UsersDB: UsuariosDB
    }
}