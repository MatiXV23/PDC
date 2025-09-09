import Fastify, { type FastifyPluginAsync } from 'fastify';
import { PC_NotImplemented } from '../../errors/errors.ts';

const profileRoute: FastifyPluginAsync = async (fastify, opts) => {
    fastify.get('/', async (request, reply) => {
        throw new PC_NotImplemented('GET /profile');
    });
    
    fastify.put('/', async (request, reply) => {
        throw new PC_NotImplemented('PUT /profile');
    });
};

export default profileRoute;