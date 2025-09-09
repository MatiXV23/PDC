import Fastify, { type FastifyPluginAsync } from 'fastify';
import { PC_NotImplemented } from '../../errors/errors.ts';

const loginRoute: FastifyPluginAsync = async (fastify, opts) => {
    fastify.post('/', {
        schema: {
            summary: 'Iniciar sesión',
            description: 'Permite a un usuario autenticarse y recibir un token de sesión.',
            response: {
                501: {
                    type: 'object',
                    properties: {
                        statusCode: { type: 'number' },
                        error: { type: 'string' },
                        message: { type: 'string' }
                    }
                }
            }
        }
    }, async (request, reply) => {
        throw new PC_NotImplemented('POST /login');
    });
};

export default loginRoute;