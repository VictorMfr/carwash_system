/** @jest-environment node */
import { isValidPicture } from "@/lib/pictures";

// Polyfill File for Node.js environment
if (typeof File === 'undefined') {
    class FilePolyfill {
        name: string;
        size: number;
        type: string;
        constructor(parts: any[], name: string, options?: { type?: string }) {
            this.name = name;
            this.size = parts.reduce((acc, part) => acc + (part.length || 0), 0);
            this.type = options?.type || '';
        }
    }
    (global as any).File = FilePolyfill;
}

// Helper to create a File for testing
const createTestFile = (name: string, size: number, type: string = ''): File => {
    const content = new Array(size).fill('a').join('');
    const file = new File([content], name, { type });
    // Ensure it passes instanceof File check
    if (!(file instanceof File)) {
        Object.setPrototypeOf(file, File.prototype);
    }
    return file;
};

describe('Utilidades - Validación de imágenes', () => {

    describe('isValidPicture', () => {
        test('Debe retornar true para un archivo válido', () => {
            const file = createTestFile('test.jpg', 1024, 'image/jpeg');
            const result = isValidPicture(file);
            expect(result).toBe(true);
        });

        test('Debe retornar false para null', () => {
            const result = isValidPicture(null);
            expect(result).toBe(false);
        });

        test('Debe retornar false para string', () => {
            const result = isValidPicture('path/to/image.jpg');
            expect(result).toBe(false);
        });

        test('Debe retornar false para archivo vacío (size = 0)', () => {
            const file = createTestFile('test.jpg', 0, 'image/jpeg');
            const result = isValidPicture(file);
            expect(result).toBe(false);
        });

        test('Debe retornar true para archivo PNG', () => {
            const file = createTestFile('test.png', 2048, 'image/png');
            const result = isValidPicture(file);
            expect(result).toBe(true);
        });

        test('Debe retornar true para archivo WebP', () => {
            const file = createTestFile('test.webp', 1536, 'image/webp');
            const result = isValidPicture(file);
            expect(result).toBe(true);
        });

        test('Debe retornar true para archivo GIF', () => {
            const file = createTestFile('test.gif', 512, 'image/gif');
            const result = isValidPicture(file);
            expect(result).toBe(true);
        });

        test('Debe retornar true para archivo sin tipo MIME pero con tamaño > 0', () => {
            const file = createTestFile('test.jpg', 1024, '');
            const result = isValidPicture(file);
            expect(result).toBe(true);
        });

        test('Debe retornar false para undefined', () => {
            const result = isValidPicture(undefined as any);
            expect(result).toBe(false);
        });

        test('Debe manejar errores y retornar false', () => {
            // Simular un error pasando un objeto que no es File ni string ni null
            const invalidInput = { someProperty: 'value' } as any;
            const result = isValidPicture(invalidInput);
            expect(result).toBe(false);
        });
    });
});

