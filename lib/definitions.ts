import { z } from 'zod'
 
// Login Schema
export const LoginSchema = z.object({
  email: 
  z.string()
  .min(1, 'El email es requerido')
  .email('El email no es válido'),

  password: 
  z.string()
  .min(1, 'La contraseña es requerida')
});

// User create schema
export const UserCreateSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  lastname: z.string().min(1, 'El apellido es requerido'),
  phone: z.string().min(1, 'El teléfono es requerido'),
  address: z.string().min(1, 'La dirección es requerida'),
  email: z.string().min(1, 'El email es requerido').email('El email no es válido'),
  password: z.string().min(1, 'La contraseña es requerida')
});

// User update schema (password no requerido)
export const UserUpdateSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  lastname: z.string().min(1, 'El apellido es requerido'),
  phone: z.string().min(1, 'El teléfono es requerido'),
  address: z.string().min(1, 'La dirección es requerida'),
  email: z.string().min(1, 'El email es requerido').email('El email no es válido'),
  password: z.string().optional()
});

// Assign roles schema
export const AssignRolesSchema = z.object({
  roles: z.array(z.union([z.string(), z.number()])).min(1, 'Debe seleccionar al menos un rol')
});