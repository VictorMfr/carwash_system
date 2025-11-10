/** @jest-environment node */
import { toObject, toFormData } from "../util";

describe('Utilidades - Transformación de datos', () => {

    describe('toObject', () => {
        test('Debe convertir array de objetos field/value a objeto plano', () => {
            const input = [
                { field: 'name', value: 'John' },
                { field: 'email', value: 'john@example.com' },
                { field: 'age', value: 30 }
            ];

            const result = toObject(input);

            expect(result).toEqual({
                name: 'John',
                email: 'john@example.com',
                age: 30
            });
        });

        test('Debe manejar array vacío', () => {
            const input: any[] = [];
            const result = toObject(input);
            expect(result).toEqual({});
        });

        test('Debe manejar valores null y undefined', () => {
            const input = [
                { field: 'name', value: 'John' },
                { field: 'email', value: null },
                { field: 'phone', value: undefined }
            ];

            const result = toObject(input);

            expect(result).toEqual({
                name: 'John',
                email: null,
                phone: undefined
            });
        });

        test('Debe manejar valores booleanos', () => {
            const input = [
                { field: 'isActive', value: true },
                { field: 'isDeleted', value: false }
            ];

            const result = toObject(input);

            expect(result).toEqual({
                isActive: true,
                isDeleted: false
            });
        });

        test('Debe manejar objetos anidados', () => {
            const input = [
                { field: 'name', value: 'John' },
                { field: 'address', value: { street: '123 Main St', city: 'New York' } }
            ];

            const result = toObject(input);

            expect(result).toEqual({
                name: 'John',
                address: { street: '123 Main St', city: 'New York' }
            });
        });

        test('Debe manejar arrays como valores', () => {
            const input = [
                { field: 'name', value: 'John' },
                { field: 'tags', value: ['tag1', 'tag2', 'tag3'] }
            ];

            const result = toObject(input);

            expect(result).toEqual({
                name: 'John',
                tags: ['tag1', 'tag2', 'tag3']
            });
        });
    });

    describe('toFormData', () => {
        test('Debe convertir objeto plano a array de objetos field/value', () => {
            const input = {
                name: 'John',
                email: 'john@example.com',
                age: 30
            };

            const result = toFormData(input);

            expect(result).toEqual([
                { field: 'name', value: 'John' },
                { field: 'email', value: 'john@example.com' },
                { field: 'age', value: 30 }
            ]);
        });

        test('Debe manejar objeto vacío', () => {
            const input = {};
            const result = toFormData(input);
            expect(result).toEqual([]);
        });

        test('Debe manejar valores null y undefined', () => {
            const input = {
                name: 'John',
                email: null,
                phone: undefined
            };

            const result = toFormData(input);

            expect(result).toEqual([
                { field: 'name', value: 'John' },
                { field: 'email', value: null },
                { field: 'phone', value: undefined }
            ]);
        });

        test('Debe manejar valores booleanos', () => {
            const input = {
                isActive: true,
                isDeleted: false
            };

            const result = toFormData(input);

            expect(result).toEqual([
                { field: 'isActive', value: true },
                { field: 'isDeleted', value: false }
            ]);
        });

        test('Debe manejar objetos anidados', () => {
            const input = {
                name: 'John',
                address: { street: '123 Main St', city: 'New York' }
            };

            const result = toFormData(input);

            expect(result).toEqual([
                { field: 'name', value: 'John' },
                { field: 'address', value: { street: '123 Main St', city: 'New York' } }
            ]);
        });

        test('Debe manejar arrays como valores', () => {
            const input = {
                name: 'John',
                tags: ['tag1', 'tag2', 'tag3']
            };

            const result = toFormData(input);

            expect(result).toEqual([
                { field: 'name', value: 'John' },
                { field: 'tags', value: ['tag1', 'tag2', 'tag3'] }
            ]);
        });

        test('toObject y toFormData deben ser inversas', () => {
            const original = {
                name: 'John',
                email: 'john@example.com',
                age: 30,
                isActive: true
            };

            const formData = toFormData(original);
            const backToObject = toObject(formData);

            expect(backToObject).toEqual(original);
        });
    });
});

