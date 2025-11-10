/** @jest-environment node */
import { z } from 'zod';
import { UserObjectCreateSchema, ProductObjectSchema, BrandObjectSchema, AccountObjectSchema } from '@/lib/definitions';

describe('Utilidades - Validación de schemas', () => {

    describe('UserObjectCreateSchema', () => {
        test('Debe validar datos de usuario correctos', () => {
            const validUser = {
                name: 'John',
                lastname: 'Doe',
                phone: '1234567890',
                address: '123 Main St',
                email: 'john@example.com',
                password: 'password123'
            };

            const result = UserObjectCreateSchema.safeParse(validUser);
            expect(result.success).toBe(true);
        });

        test('Debe rechazar usuario sin nombre', () => {
            const invalidUser = {
                lastname: 'Doe',
                phone: '1234567890',
                address: '123 Main St',
                email: 'john@example.com',
                password: 'password123'
            };

            const result = UserObjectCreateSchema.safeParse(invalidUser);
            expect(result.success).toBe(false);
        });

        test('Debe rechazar email inválido', () => {
            const invalidUser = {
                name: 'John',
                lastname: 'Doe',
                phone: '1234567890',
                address: '123 Main St',
                email: 'invalid-email',
                password: 'password123'
            };

            const result = UserObjectCreateSchema.safeParse(invalidUser);
            expect(result.success).toBe(false);
        });

        test('Debe rechazar usuario sin password', () => {
            const invalidUser = {
                name: 'John',
                lastname: 'Doe',
                phone: '1234567890',
                address: '123 Main St',
                email: 'john@example.com'
            };

            const result = UserObjectCreateSchema.safeParse(invalidUser);
            expect(result.success).toBe(false);
        });
    });

    describe('ProductObjectSchema', () => {
        test('Debe validar producto correcto', () => {
            const validProduct = {
                name: 'Test Product',
                unit: 'kg',
                isTool: false
            };

            const result = ProductObjectSchema.safeParse(validProduct);
            expect(result.success).toBe(true);
        });

        test('Debe validar producto sin isTool (opcional)', () => {
            const validProduct = {
                name: 'Test Product',
                unit: 'kg'
            };

            const result = ProductObjectSchema.safeParse(validProduct);
            expect(result.success).toBe(true);
        });

        test('Debe rechazar producto sin nombre', () => {
            const invalidProduct = {
                unit: 'kg',
                isTool: false
            };

            const result = ProductObjectSchema.safeParse(invalidProduct);
            expect(result.success).toBe(false);
        });

        test('Debe rechazar producto sin unidad', () => {
            const invalidProduct = {
                name: 'Test Product',
                isTool: false
            };

            const result = ProductObjectSchema.safeParse(invalidProduct);
            expect(result.success).toBe(false);
        });

        test('Debe rechazar nombre vacío', () => {
            const invalidProduct = {
                name: '',
                unit: 'kg',
                isTool: false
            };

            const result = ProductObjectSchema.safeParse(invalidProduct);
            expect(result.success).toBe(false);
        });
    });

    describe('BrandObjectSchema', () => {
        test('Debe validar marca correcta', () => {
            const validBrand = {
                name: 'Test Brand'
            };

            const result = BrandObjectSchema.safeParse(validBrand);
            expect(result.success).toBe(true);
        });

        test('Debe rechazar marca sin nombre', () => {
            const invalidBrand = {};

            const result = BrandObjectSchema.safeParse(invalidBrand);
            expect(result.success).toBe(false);
        });

        test('Debe rechazar nombre vacío', () => {
            const invalidBrand = {
                name: ''
            };

            const result = BrandObjectSchema.safeParse(invalidBrand);
            expect(result.success).toBe(false);
        });
    });

    describe('AccountObjectSchema', () => {
        test('Debe validar cuenta correcta', () => {
            const validAccount = {
                name: 'Test Account',
                description: 'Test Description'
            };

            const result = AccountObjectSchema.safeParse(validAccount);
            expect(result.success).toBe(true);
        });

        test('Debe rechazar cuenta sin nombre', () => {
            const invalidAccount = {
                description: 'Test Description'
            };

            const result = AccountObjectSchema.safeParse(invalidAccount);
            expect(result.success).toBe(false);
        });

        test('Debe rechazar cuenta sin descripción', () => {
            const invalidAccount = {
                name: 'Test Account'
            };

            const result = AccountObjectSchema.safeParse(invalidAccount);
            expect(result.success).toBe(false);
        });

        test('Debe rechazar nombre vacío', () => {
            const invalidAccount = {
                name: '',
                description: 'Test Description'
            };

            const result = AccountObjectSchema.safeParse(invalidAccount);
            expect(result.success).toBe(false);
        });
    });
});

