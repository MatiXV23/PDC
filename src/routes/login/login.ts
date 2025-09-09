import Fastify, { type FastifyPluginAsync } from 'fastify';
import { PC_NoAuthorized, PC_NotImplemented } from '../../errors/errors.ts';
import { Type } from '@fastify/type-provider-typebox';
import { credencialesSchema, Usuario } from '../../models/usuario_model.ts';
import { UsuariosDB } from '../../services/usuarios_db_service.ts';
import { SignOptions } from 'jsonwebtoken';

const loginRoute: FastifyPluginAsync = async (fastify, opts) => {
        
    fastify.post('/', {
        schema: {
            summary: "Login",
            description: "En esta ruta el usuario puede logearse",
            tags: ["login"],
            body: Type.Object({ credencialesSchema: credencialesSchema }),
            response: {
                200: { token: Type.String()}
            },
            security: [
                { bearerAuth: []}
            ]
        },
    },
    async (request, reply) => {
        const cuenta = await UsuariosDB.getUserByCredentials(request.body);
        if (!cuenta) {
            throw new PC_NoAuthorized("Credenciales incorrectas!");
        }
        const payload: Usuario = cuenta.usuario;

        const signOptions: SignOptions = {
            expiresIn: "8h"
        }
        const token = fastify.jwt.sign(payload, signOptions);
        return {token: token}
    });
};

export default loginRoute;