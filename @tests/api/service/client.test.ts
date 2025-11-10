/** @jest-environment node */
import { POST, GET, DELETE } from "@/app/api/service/client/route";
import { GET as GETClient, PUT as PUTClient, DELETE as DELETEClient } from "@/app/api/service/client/[id]/route";
import { Client } from "@/services/backend/models/associations";
import { toObject } from "../../util";

const testClientOne = {
    json: async () => [
        { field: 'name', value: 'John' },
        { field: 'lastname', value: 'Doe' },
        { field: 'phone', value: '1234567890' },
    ] as any,
} as any;

const testClientTwo = {
    json: async () => [
        { field: 'name', value: 'Jane' },
        { field: 'lastname', value: 'Smith' },
        { field: 'phone', value: '0987654321' },
    ] as any,
} as any;

describe('Rutas de cliente', () => {

    // Crear cliente
    test('Crear cliente', async () => {
        const testData = {
            json: async () => toObject(await testClientOne.json())
        } as any;

        const test = await POST(testData);
        const client = await test.json();
        expect(test.status).toBe(200);
        
        // Delete client
        await (await Client.findByPk(client.id))?.destroy({ force: true });
    });

    // Obtener clientes
    test('Obtener clientes', async () => {
        const clients = await GET();
        expect(clients.status).toBe(200);
    });

    // Visualizar cliente
    test('Visualizar cliente', async () => {
        const client = await GETClient(null as any, { params: Promise.resolve({ id: '1' }) });
        expect(client.status).toBe(200);
    });

    // Actualizar cliente
    test('Actualizar cliente', async () => {
        const client = await Client.create(toObject(await testClientOne.json()));
        const testData = {
            json: async () => toObject(await testClientOne.json())
        } as any;

        const response = await PUTClient(testData, { params: Promise.resolve({ id: client.id.toString() }) });
        expect(response.status).toBe(200);
        await client.destroy({ force: true });
    });

    // Borrar cliente
    test('Borrar cliente', async () => {
        const client = await Client.create(toObject(await testClientOne.json()));
        const response = await DELETEClient(null as any, { params: Promise.resolve({ id: client.id.toString() }) });
        expect(response.status).toBe(200);
        await client.destroy({ force: true });
    });

    // Borrar multiple clientes
    test('Borrar multiple clientes', async () => {
        const clientOne = await Client.create(toObject(await testClientOne.json()));
        const clientTwo = await Client.create(toObject(await testClientTwo.json()));

        const request = { json: async () => ({ ids: [clientOne.id.toString(), clientTwo.id.toString()] }) } as any;

        const response = await DELETE(request);
        expect(response.status).toBe(200);

        await clientOne.destroy({ force: true });
        await clientTwo.destroy({ force: true });
    });
});

