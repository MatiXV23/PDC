import  { type FastifyPluginAsync } from 'fastify';
import { PC_NoAuthorized, PC_NotImplemented } from '../../errors/errors.ts';
import { Type } from '@fastify/type-provider-typebox';
import { credencialesSchema } from '../../models/usuario_model.ts';
import type { Credenciales, Usuario } from '../../models/usuario_model.ts';
import jwt from "jsonwebtoken";

const { sign, verify, decode } = jwt;
type SignOptions = jwt.SignOptions;

const loginRoute: FastifyPluginAsync = async (fastify, opts) => {
        
    fastify.post('/', 
        {
        schema: {
            summary: "Login",
            description: "En esta ruta el usuario puede logearse",
            tags: ["default"],
            body: credencialesSchema,
            response: {
                200: { token: Type.String()}
            },
            security: [
                { bearerAuth: []}
            ]
        },
    },
    async (request, reply) => {
        const cuenta = await fastify.UsersDB.getUserByCredentials(request.body as Credenciales);
        if (!cuenta) {
            throw new PC_NoAuthorized("Credenciales incorrectas!");
        }
        const payload: Usuario = cuenta;

        const signOptions: SignOptions = {
            expiresIn: "8h"
        }
        const token = fastify.jwt.sign(payload, signOptions);
        return {token: token}
    });
};

export default loginRoute;