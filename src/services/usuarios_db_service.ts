import { BasePgRepository } from "../models/baseRepository.ts";
import  type { Usuario, Credenciales } from "../models/usuario_model.ts";
import { PC_BadRequest, PC_InternalServerError, PC_NotFound, PC_NotImplemented } from "../errors/errors.ts";
import { Pool } from "pg";
import { Any } from "@fastify/type-provider-typebox";

export class UsuariosDB extends BasePgRepository<Usuario> {

    constructor(pool: Pool) {
        super(pool)
    }

    #baseQuery = /*sql*/`
                SELECT 
                    u.*, array_agg(r.nombre) AS roles
                FROM usuarios u
                LEFT JOIN usuarios_roles ru ON u.id_usuario = ru.id_usuario
                LEFT JOIN roles r ON ru.id_rol = r.id_rol
                `

    async getAll(): Promise<Usuario[]> {
        const users = await this.pool.query<Usuario>(this.#baseQuery+'GROUP BY u.id_usuario;')

        return users.rows
    }
    
    async getById(id:number): Promise<Usuario> {
        const query = this.#baseQuery + `WHERE u.id_usuario = $1
                                        GROUP BY u.id_usuario;`
        const vars = [id]
        const res = await this.pool.query<Usuario>(query, vars)
        
        if (res.rowCount === 0) throw new PC_NotFound(`Usuario con id (${id}) no encontrado`)
        return res.rows[0]
    }

    async create(data: Partial<Usuario>): Promise<Usuario> {
        const {username, email, activo, reputacion, fecha_nacimiento, nombres, apellidos, edad, sexo, foto_url, roles} = data
        const rolsQ = roles?.includes('admin') ? `('user', 'admin')` : `('user')`
        let query = /*sql*/` 
                    WITH nuevo_usuario AS (
                        INSERT INTO usuarios (username, email, activo, reputacion, fecha_nacimiento, nombres, apellidos, edad, sexo, foto_url)
                            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
                            RETURNING id_usuario
                        ),
                        cred AS (
                            INSERT INTO credenciales (id_usuario, password_hash)
                            SELECT id_usuario, crypt('contraseña', gen_salt('bf'))
                            FROM nuevo_usuario
                            RETURNING id_usuario
                        ),
                        roles AS (
                            INSERT INTO usuarios_roles (id_usuario, id_rol)
                            SELECT c.id_usuario, r.id_rol
                            FROM cred c
                            JOIN roles r ON r.nombre IN ${rolsQ}
                            RETURNING id_usuario
                        )
                    SELECT id_usuario from roles;`

        const res = await this.pool.query(query, [username, email, activo, reputacion, fecha_nacimiento, nombres, apellidos, edad, sexo, foto_url || null])
        const user:Usuario = await this.getById(res.rows[0].id_usuario)
        return user
    }

    async update(id: number, data: Partial<Usuario>): Promise<Usuario> {
        let query = `UPDATE usuarios
                        SET 
                    `
        let cont = 2;
        let vars = [id]
        
        for (const key in data){
            if (!data[key] || key === 'id_usuario' || key === 'roles') continue

            query += `${key} = $${cont},`
            vars.push(data[key])
            cont++
        }
        query = query.slice(0, -1)

        query += `  WHERE id_usuario = $1;`
        await this.pool.query(query, vars)

        const roles = data["roles"] 
        if (roles) {
            console.log(roles)
            await this.pool.query(/*sql*/`
                DELETE FROM usuarios_roles
                WHERE id_rol IN (
                    SELECT r.id_rol
                    FROM roles r
                    WHERE r.nombre <> ALL($2)
                )
                AND id_usuario = $1;
            `, [id, roles])

            await this.pool.query(/*sql*/`
                INSERT INTO usuarios_roles (id_usuario, id_rol)
                SELECT $1, r.id_rol
                FROM roles r
                WHERE r.nombre = ANY($2)
                AND NOT EXISTS (
                    SELECT 1
                    FROM usuarios_roles ur
                    WHERE ur.id_usuario = $1
                        AND ur.id_rol = r.id_rol
                );
                `, [id, roles])
        }
        
        return await this.getById(id)
    }

    async delete(id: number): Promise<void> {
        const query =  `DELETE FROM usuarios
                        WHERE id_usuario = $1;`
        const res = await this.pool.query<Usuario>(query, [id])

        if (res.rowCount === 0) throw new PC_NotFound(`Usuario de id ${id}, no existe. Ignorando`)
        console.log(res)
    }

    async findAll(data: Partial<Usuario>): Promise<Usuario[]> {
        throw new PC_NotImplemented()
    }

    async getFirstBy(data: Partial<Usuario>): Promise<Usuario | undefined> {
        throw new PC_NotImplemented()
    }

    async getUserByCredentials(credenciales: Credenciales): Promise<any> {
        const query = this.#baseQuery + `JOIN credenciales c ON c.id_usuario = u.id_usuario
                                        WHERE u.username = $1 AND c.password_hash = crypt($2, password_hash)
                                        GROUP BY u.id_usuario;`
        const vars = [credenciales.username, credenciales.password]
        const res = await this.pool.query<Usuario>(query, vars)
        
        if (res.rowCount === 0) throw new PC_NotFound(`Usuario no encontrado. Credenciales Incorrectas`)

        return res.rows[0]
    }
}
