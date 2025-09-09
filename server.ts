import Fastify from 'fastify';
import { join } from 'path';
import autoload from '@fastify/autoload';
import jwtPlugin from './src/plugins/jwt';

const fastify = Fastify({
    logger: {
        level: 'info',
        transport: {
            target: 'pino-pretty',
            options: {
                colorize: true,
                translateTime: 'SYS:HH:MM:ss Z'
            }
        }
    }
});

fastify.register(jwtPlugin);
await fastify.register(autoload, {
    dir: join(import.meta.dirname, 'src', 'routes')
});

const port = Number(process.env.PORT) || 3000;
const host = '::';

try {
    await fastify.listen({ port, host });
    fastify.log.info(`Servidor corriendo en http://localhost:${port}`);
    fastify.log.info(`Las rutas se cargan automáticamente desde src/routes/`);
} catch (error) {
    fastify.log.error(error);
    process.exit(1);
}