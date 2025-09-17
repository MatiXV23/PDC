import { Type } from '@sinclair/typebox'
import type { Static } from '@sinclair/typebox'

export const usuarioSchema = Type.Object({
    id_usuario: Type.Integer({minimum: 1}),
    username: Type.String({maximum: 15}),
    email: Type.String(),
    activo: Type.Boolean(),
    reputacion: Type.Number({minimum: 0, maximum: 999}),
    fecha_registro: Type.String({ format: 'date-time'}),
    fecha_nacimiento: Type.String({ format: 'date'}),
    nombres: Type.String({maximum:50}),
    apellidos: Type.String({maximum:50}),
    edad: Type.Number(),
    sexo: Type.String({enum: ["M", "F"]}),
    foto_url: Type.Optional(Type.String({maximum:520})),
    roles: Type.Array(Type.String({enum: ["user", "admin"]}))
})

export const queryUsuarioSchema = Type.Object({
    nombre : Type.Optional(Type.String()),
    username : Type.Optional(Type.String()),
    roles: Type.Optional(Type.String()),
})

export const credencialesSchema = Type.Object({
    username : Type.String({minLength: 2, default: 'admin'}),
    password : Type.String({minLength: 2, default: 'contraseña'})
})


export type Credenciales = Static<typeof credencialesSchema>
export type Usuario = Static<typeof usuarioSchema>


export type UsuarioM = Usuario & {
    isAdmin() : () => boolean
}

