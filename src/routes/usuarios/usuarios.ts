import Fastify, { type FastifyPluginAsync } from 'fastify';
import { PC_Forbidden, PC_NotImplemented } from '../../errors/errors.ts';
import { type Usuario, usuarioSchema } from '../../models/usuario_model.ts';
import { Type } from '@fastify/type-provider-typebox';

const userRoutes: FastifyPluginAsync = async (fastify, opts) => {
    
    fastify.get('',{
        schema: {
            summary: "Obtener todos los usuarios",
            tags: ["usuarios"],
            response: {
                200: Type.Array(usuarioSchema)
            },
            security: [
                { bearerAuth: [] }
            ]
        },
        onRequest: fastify.authenticate,
        preHandler: fastify.isAdmin
    },
    async (request, reply) => {
        return await fastify.UsersDB.getAll()
    });

    fastify.post('', 
        {
        schema: {
            summary: "Register",
            description: "En esta ruta el usuario puede registrarse",
            tags: ["Auth","usuarios"],
            body: Type.Omit(usuarioSchema, ["id_usuario", "fecha_registro"]),
            response: {
                201: usuarioSchema
            }
        },
    },
    async (request, reply) => {
        const user: Usuario = await fastify.UsersDB.create(request.body as Usuario)
        return reply.code(201).send(user) 
    });
};

export default userRoutes;