/** @jest-environment node */
import { POST, GET, DELETE } from "@/app/api/finance/method/route";
import { GET as GETMethod, PUT as PUTMethod, DELETE as DELETEMethod } from "@/app/api/finance/method/[id]/route";
import { Method } from "@/services/backend/models/associations";
import { toObject } from "../../util";

const testMethodOne = {
    json: async () => [
        { field: 'name', value: 'Test Method One' },
    ] as any,
} as any;

const testMethodTwo = {
    json: async () => [
        { field: 'name', value: 'Test Method Two' },
    ] as any,
} as any;

describe('Rutas de método', () => {

    // Crear método
    test('Crear método', async () => {
        const testData = {
            json: async () => toObject(await testMethodOne.json())
        } as any;

        const test = await POST(testData);
        const method = await test.json();
        expect(test.status).toBe(200);
        
        // Delete method
        await (await Method.findByPk(method.id))?.destroy({ force: true });
    });

    // Obtener métodos
    test('Obtener métodos', async () => {
        const methods = await GET();
        expect(methods.status).toBe(200);
    });

    // Visualizar método
    test('Visualizar método', async () => {
        const method = await GETMethod(null as any, { params: Promise.resolve({ id: '1' }) });
        expect(method.status).toBe(200);
    });

    // Actualizar método
    test('Actualizar método', async () => {
        const method = await Method.create(toObject(await testMethodOne.json()));
        const testData = {
            json: async () => toObject(await testMethodOne.json())
        } as any;

        const response = await PUTMethod(testData, { params: Promise.resolve({ id: method.id.toString() }) });
        expect(response.status).toBe(200);
        await method.destroy({ force: true });
    });

    // Borrar método
    test('Borrar método', async () => {
        const method = await Method.create(toObject(await testMethodOne.json()));
        const response = await DELETEMethod(null as any, { params: Promise.resolve({ id: method.id.toString() }) });
        expect(response.status).toBe(200);
        await method.destroy({ force: true });
    });

    // Borrar multiple métodos
    test('Borrar multiple métodos', async () => {
        const methodOne = await Method.create(toObject(await testMethodOne.json()));
        const methodTwo = await Method.create(toObject(await testMethodTwo.json()));

        const request = { json: async () => ({ ids: [methodOne.id.toString(), methodTwo.id.toString()] }) } as any;

        const response = await DELETE(request);
        expect(response.status).toBe(200);

        await methodOne.destroy({ force: true });
        await methodTwo.destroy({ force: true });
    });
});

