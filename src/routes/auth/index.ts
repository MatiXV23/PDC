import type { FastifyPluginAsync } from 'fastify';
import { PC_NotImplemented } from '../../errors/errors';

const authRoutes: FastifyPluginAsync = async (fastify, opts) => {
    fastify.post('/login', async (request, reply) => {
        throw new PC_NotImplemented('POST /api/auth/login');
    });

    
    fastify.post('/register', async (request, reply) => {
        throw new PC_NotImplemented('POST /api/auth/register');
    });

    
    fastify.post('/logout', async (request, reply) => {
        throw new PC_NotImplemented('POST /api/auth/logout');
    });
};

export default authRoutes;