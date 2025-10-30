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

// USER SCHEMA  

// User create schema
export const UserObjectCreateSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  lastname: z.string().min(1, 'El apellido es requerido'),
  phone: z.string().min(1, 'El teléfono es requerido'),
  address: z.string().min(1, 'La dirección es requerida'),
  email: z.string().min(1, 'El email es requerido').email('El email no es válido'),
  password: z.string().min(1, 'La contraseña es requerida')
});

// User update schema (password no requerido)
export const UserObjectUpdateSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  lastname: z.string().min(1, 'El apellido es requerido'),
  phone: z.string().min(1, 'El teléfono es requerido'),
  address: z.string().min(1, 'La dirección es requerida'),
  email: z.string().min(1, 'El email es requerido').email('El email no es válido'),
});

// Assign roles schema
export const AssignRolesSchema = z.object({
  roles: z.array(z.union([z.string(), z.number()])).min(1, 'Debe seleccionar al menos un rol')
});







// STOCK SCHEMA

// Stock create schema
export const StockObjectSchema = z.object({
  product: z.object(undefined, 'Debe seleccionar un producto'),
  minimum_quantity: z.number('Debe seleccionar una cantidad mínima').positive('Debe ser positivo'),
});

// Product schema
export const ProductObjectSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  unit: z.string().min(1, 'La unidad es requerida'),
  isTool: z.boolean().optional(),
});

export const BrandObjectSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
});




// FORM INPUTS SCHEMA
const FormInputSchema = z.object({
  field: z.string(),
  value: z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.record(z.string(), z.any()), // allow object values
    z.null()
  ]),
  error: z.string().optional().default('')
});

const FormInputsArraySchema = z.array(FormInputSchema).transform(arr =>
  arr.reduce((acc, cur) => {
    acc[cur.field] = cur.value;
    return acc;
  }, {} as Record<string, string | number | boolean | Record<string, any> | null>)
);

// FINANCE SCHEMA
export const FinanceObjectSchema = z.object({
  date: z.string().min(1, 'La fecha es requerida'),
  amount: z.number('El monto es requerido'),
  description: z.string().min(1, 'La descripción es requerida'),
  auto: z.boolean().optional(),
  dollar_rate: z.number('La tasa de dólar es requerida').positive('La tasa de dólar debe ser positiva'),
  account: z.object(undefined, 'Debe seleccionar una cuenta'),
  method: z.object(undefined, 'Debe seleccionar un método'),
});

export const AccountObjectSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  description: z.string().min(1, 'La descripción es requerida'),
});

export const MethodObjectSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
});

// SERVICE SCHEMA

export const OperatorObjectSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  lastname: z.string().min(1, 'El apellido es requerido'),
  phone: z.string().min(1, 'El teléfono es requerido'),
  address: z.string().min(1, 'La dirección es requerida'),
});


// EXPORT SCHEMAS
export const BrandSchema = FormInputsArraySchema.pipe(BrandObjectSchema);
export const UserCreateSchema = FormInputsArraySchema.pipe(UserObjectCreateSchema);
export const UserUpdateSchema = FormInputsArraySchema.pipe(UserObjectUpdateSchema);
export const StockSchema = FormInputsArraySchema.pipe(StockObjectSchema);
export const ProductSchema = FormInputsArraySchema.pipe(ProductObjectSchema);
export const OperatorSchema = FormInputsArraySchema.pipe(OperatorObjectSchema);
export const AccountSchema = FormInputsArraySchema.pipe(AccountObjectSchema);
export const MethodSchema = FormInputsArraySchema.pipe(MethodObjectSchema);
export const FinanceSchema = FormInputsArraySchema.pipe(FinanceObjectSchema);