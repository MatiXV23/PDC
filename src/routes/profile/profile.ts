import { PC_BadRequest } from '../../errors/errors.ts';
import { usuarioSchema } from '../../models/usuario_model.ts';
import type { Usuario } from '../../models/usuario_model.ts';
import { Type } from '@fastify/type-provider-typebox';
import { type FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';

const profileRoute: FastifyPluginAsyncTypebox = async (fastify) => {

    fastify.get('/', {
        // schema: {
        //     summary: "Perfil del usuario",
        //     description: "En esta ruta el usuario puede ver su perfil",
        //     tags: ["login"],
        //     response: {
        //         200: usuarioSchema
        //     },
        //     security: [
        //         { bearerAuth: [] }
        //     ],
        // },
        // OnRequest: async (request, reply) => {
        //     await request.jwtVerify();
        // },
        handler: async function (request, reply) {
            const { id_usuario } = request.user as Usuario;
            return fastify.UsersDB.getById(id_usuario);
        }
    });
    fastify.put('/', {
        schema: {
            summary: "Modificar perfil",
            description: "En esta ruta se puede modificar el perfil del usuario",
            tags: ["default"],
            params: Type.Pick(usuarioSchema, ["id_usuario"]),
            body: usuarioSchema,
            response: {
                204: Type.Null()
            }
        },
    },
    async function handler(request, reply) {
        const {id_usuario} = request.params;
        const {username, activo} = request.body;
        const id_body = request.body.id_usuario;

        if (id_usuario !== id_body) throw new PC_BadRequest("Las id's no coinciden.");
        await fastify.UsersDB.update(id_usuario, {username, activo});
        return reply.code(204).send();
    });
}

export default profileRoute;