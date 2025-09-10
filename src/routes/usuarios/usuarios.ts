import Fastify, { type FastifyPluginAsync } from 'fastify';
import { PC_NotImplemented } from '../../errors/errors.ts';
import { type Usuario, usuarioSchema } from '../../models/usuario_model.ts';
import { Type } from '@fastify/type-provider-typebox';

const userRoutes: FastifyPluginAsync = async (fastify, opts) => {

    fastify.get('/',{
        schema: {
            summary: "Obtener todos los uaurios",
            tags: ["Usuarios"],
            response: {
                200: Type.Array(usuarioSchema)
            },
            security: [
                { bearerAuth: [] }
            ]
        },
        onRequest: fastify.authenticate
    },
    async (request, reply) => {
        return await fastify.UsersDB.getAll()
    });

    fastify.post('', 
        {
        schema: {
            summary: "Register",
            description: "En esta ruta el usuario puede registrarse",
            tags: ["Auth"],
            body: Type.Omit(usuarioSchema, ["id_usuario"]),
            response: {
                200: usuarioSchema
            }
        },
    },
    async (request, reply) => {
        const user: Usuario = await fastify.UsersDB.create(request.body as Usuario)
        return user 
    });
};

export default userRoutes;