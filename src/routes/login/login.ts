import  { type FastifyPluginAsync } from 'fastify';
import { PC_NoAuthorized, PC_NotImplemented } from '../../errors/errors.ts';
import { Type } from '@fastify/type-provider-typebox';
import { credencialesSchema } from '../../models/usuario_model.ts';
import type { Usuario } from '../../models/usuario_model.ts';
import { UsuariosDB } from '../../services/usuarios_db_service.ts';
import jwt from "jsonwebtoken";

const { sign, verify, decode } = jwt;
type SignOptions = jwt.SignOptions;

const loginRoute: FastifyPluginAsync = async (fastify, opts) => {
        
    fastify.post('/', 
    //     /*NO BORRAR NADA, HAY QUE DESCOMENTAR TODO ESTO CUANDO ESTE PRONTA LA DB! Salu2*/
    //     {
    //     schema: {
    //         summary: "Login",
    //         description: "En esta ruta el usuario puede logearse",
    //         tags: ["default"],
    //         body: Type.Object({ credencialesSchema: credencialesSchema }),
    //         response: {
    //             200: { token: Type.String()}
    //         },
    //         security: [
    //             { bearerAuth: []}
    //         ]
    //     },
    // },
    async (request, reply) => {
        throw new PC_NotImplemented('POST /login - Despacio gente ente en obra');
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