
import Fastify, { type FastifyPluginAsync } from 'fastify';
import { PC_NotImplemented } from '../../errors/errors.ts';

const loginRoute: FastifyPluginAsync = async (fastify, opts) => {
    fastify.post('/', async (request, reply) => {
        throw new PC_NotImplemented('POST /login');
    });
};

export default loginRoute;