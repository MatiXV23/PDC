import Fastify, { type FastifyPluginAsync } from 'fastify';
import { PC_NotImplemented } from '../../../errors/errors.ts';

const userByIdRoutes: FastifyPluginAsync = async (fastify, opts) => {
    fastify.get('', async (request, reply) => {
        throw new PC_NotImplemented('GET /usuario/:id_usuario');
    });

    fastify.put('', async (request, reply) => {
        throw new PC_NotImplemented('PUT /usuario/:id_usuario');
    });

    fastify.delete('', async (request, reply) => {
        throw new PC_NotImplemented('DELETE /usuario/:id_usuario');
    });
};

export default userByIdRoutes;