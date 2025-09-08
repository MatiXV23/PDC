import type { FastifyPluginAsync } from 'fastify';
import { PC_NotImplemented } from '../../errors/errors';

const profileRoutes: FastifyPluginAsync = async (fastify, opts) => {
    
    fastify.get('/', async (request, reply) => {
        throw new PC_NotImplemented('GET /api/profile - Obtener perfil de usuario');
    });

    fastify.put('/', async (request, reply) => {
        throw new PC_NotImplemented('PUT /api/profile - Actualizar perfil de usuario');
    });
};

export default profileRoutes;