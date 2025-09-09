import fastify from "fastify";
import { BaseRepository } from "../models/baseRepository.ts";
import  type { Usuario, Credenciales } from "../models/usuario_model.ts";
import { type FastifyInstance } from "fastify";
import { PC_InternalServerError, PC_NotFound, PC_NotImplemented } from "../errors/errors.ts";


export class UsuariosDB extends BaseRepository<Usuario> {
    baseQuery = `SELECT 
                    u.id_usuario, u.username, u.email, u.nombres, u.apellidos, u.edad, u.sexo, u.foto_url, string_agg(r.nombre, ', ') AS rol
                FROM usuarios u
                LEFT JOIN usuarios_roles ru ON u.id_usuario = ru.id_usuario
                LEFT JOIN roles r ON ru.id_rol = r.id_rol
                `

    constructor(fastify: FastifyInstance) {
        super(fastify)
    }

    

    async getAll(): Promise<Usuario[]> {
        const users = await this.pg.query<Usuario>(this.baseQuery+'GROUP BY u.id_usuario;')

        return users.rows
    }
    
    async getById(id:number): Promise<Usuario> {
        
        const query = this.baseQuery + `WHERE u.id_usuario = $1
                                        GROUP BY u.id_usuario;`
        const vars = [id]
        const res = await this.pg.query<Usuario>(query, vars)
        
        if (res.rowCount === 0) throw new PC_NotFound(`Usuario con id (${id}) no encontrado`)
        return res.rows[0]
    }

    async create(data: Partial<Usuario>): Promise<Usuario> {
        throw new PC_NotImplemented()
    }

    async update(id: number, data: Partial<Usuario>): Promise<Usuario> {
        throw new PC_NotImplemented()
    }

    async delete(id: number): Promise<void> {
        throw new PC_NotImplemented()
    }

    async findAll(data: Partial<Usuario>): Promise<Usuario[]> {
        throw new PC_NotImplemented()
    }

    async getFirstBy(data: Partial<Usuario>): Promise<Usuario | undefined> {
        throw new PC_NotImplemented()
    }

    async getUserByCredentials(credenciales: Credenciales): Promise<Usuario | undefined> {
        throw new PC_NotImplemented()
    }
}
