/** @jest-environment node */

/**
 * Utilidades para formateo y validación de fechas
 */

// Formatear fecha a formato DD-MM-YYYY
export const formatDate = (date: Date | string): string => {
    const d = typeof date === 'string' ? new Date(date) : date;
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
};

// Formatear fecha a formato YYYY-MM-DD (para inputs HTML)
export const formatDateInput = (date: Date | string): string => {
    const d = typeof date === 'string' ? new Date(date) : date;
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
};

// Validar si una fecha es válida
export const isValidDate = (date: Date | string): boolean => {
    const d = typeof date === 'string' ? new Date(date) : date;
    return !isNaN(d.getTime());
};

// Obtener fecha de hace N días (robusto ante cambios de horario/DST)
export const getDateDaysAgo = (days: number): Date => {
    const MS_PER_DAY = 24 * 60 * 60 * 1000;
    return new Date(Date.now() - days * MS_PER_DAY);
};

describe('Utilidades - Fechas', () => {

    describe('formatDate', () => {
        test('Debe formatear fecha a DD-MM-YYYY', () => {
            const date = new Date(2024, 0, 15); // 15 de enero de 2024
            const result = formatDate(date);
            expect(result).toBe('15-01-2024');
        });

        test('Debe formatear fecha con días y meses de un solo dígito', () => {
            const date = new Date(2024, 0, 5); // 5 de enero de 2024
            const result = formatDate(date);
            expect(result).toBe('05-01-2024');
        });

        test('Debe manejar string de fecha', () => {
            // Usar formato ISO completo para evitar problemas de zona horaria
            const dateString = '2024-01-15T00:00:00.000Z';
            const result = formatDate(dateString);
            // El resultado puede variar según la zona horaria, así que verificamos que sea una fecha válida
            expect(result).toMatch(/^\d{2}-\d{2}-2024$/);
        });

        test('Debe formatear fecha de diciembre correctamente', () => {
            const date = new Date(2024, 11, 25); // 25 de diciembre de 2024
            const result = formatDate(date);
            expect(result).toBe('25-12-2024');
        });
    });

    describe('formatDateInput', () => {
        test('Debe formatear fecha a YYYY-MM-DD', () => {
            const date = new Date(2024, 0, 15); // 15 de enero de 2024
            const result = formatDateInput(date);
            expect(result).toBe('2024-01-15');
        });

        test('Debe formatear fecha con días y meses de un solo dígito', () => {
            const date = new Date(2024, 0, 5); // 5 de enero de 2024
            const result = formatDateInput(date);
            expect(result).toBe('2024-01-05');
        });

        test('Debe manejar string de fecha', () => {
            // Usar formato ISO completo para evitar problemas de zona horaria
            const dateString = '2024-01-15T00:00:00.000Z';
            const result = formatDateInput(dateString);
            // El resultado puede variar según la zona horaria, así que verificamos que sea una fecha válida
            expect(result).toMatch(/^2024-\d{2}-\d{2}$/);
        });
    });

    describe('isValidDate', () => {
        test('Debe retornar true para fecha válida', () => {
            const date = new Date(2024, 0, 15);
            const result = isValidDate(date);
            expect(result).toBe(true);
        });

        test('Debe retornar true para string de fecha válida', () => {
            const dateString = '2024-01-15';
            const result = isValidDate(dateString);
            expect(result).toBe(true);
        });

        test('Debe retornar false para fecha inválida', () => {
            const invalidDate = new Date('invalid');
            const result = isValidDate(invalidDate);
            expect(result).toBe(false);
        });

        test('Debe retornar false para string de fecha inválida', () => {
            const invalidDateString = 'invalid-date';
            const result = isValidDate(invalidDateString);
            expect(result).toBe(false);
        });
    });

    describe('getDateDaysAgo', () => {
        test('Debe retornar fecha de hace 7 días', () => {
            const today = new Date();
            const sevenDaysAgo = getDateDaysAgo(7);
            const diffTime = today.getTime() - sevenDaysAgo.getTime();
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
            
            expect(diffDays).toBe(7);
        });

        test('Debe retornar fecha de hace 0 días (hoy)', () => {
            const today = new Date();
            const zeroDaysAgo = getDateDaysAgo(0);
            const diffTime = today.getTime() - zeroDaysAgo.getTime();
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
            
            expect(diffDays).toBe(0);
        });

        test('Debe retornar fecha de hace 30 días', () => {
            const today = new Date();
            const thirtyDaysAgo = getDateDaysAgo(30);
            const diffTime = today.getTime() - thirtyDaysAgo.getTime();
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
            
            expect(diffDays).toBe(30);
        });
    });
});

