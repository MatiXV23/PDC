import Fastify, { type FastifyPluginAsync } from 'fastify';
import { PC_NotImplemented } from '../../errors/errors.ts';

const userRoutes: FastifyPluginAsync = async (fastify, opts) => {

    fastify.get('/', async (request, reply) => {
        throw new PC_NotImplemented('GET /api/usuarios - Obtener todos los usuarios');
    });

    fastify.post('/', async (request, reply) => {
        throw new PC_NotImplemented('POST /api/usuarios - Crear un nuevo usuario');
    });
};

export default userRoutes;