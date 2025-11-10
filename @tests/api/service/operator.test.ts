/** @jest-environment node */
import { POST, GET, DELETE } from "@/app/api/service/operator/route";
import { GET as GETOperator, PUT as PUTOperator, DELETE as DELETEOperator } from "@/app/api/service/operator/[id]/route";
import { Operator } from "@/services/backend/models/associations";
import { toObject } from "../../util";

const testOperatorOne = {
    json: async () => [
        { field: 'name', value: 'John' },
        { field: 'lastname', value: 'Doe' },
        { field: 'phone', value: '1234567890' },
        { field: 'address', value: '123 Main St' },
        { field: 'avatar', value: null },
    ] as any,
} as any;

const testOperatorTwo = {
    json: async () => [
        { field: 'name', value: 'Jane' },
        { field: 'lastname', value: 'Smith' },
        { field: 'phone', value: '0987654321' },
        { field: 'address', value: '456 Oak Ave' },
        { field: 'avatar', value: null },
    ] as any,
} as any;

describe('Rutas de operador', () => {

    // Crear operador
    test('Crear operador', async () => {
        const testData = {
            json: async () => toObject(await testOperatorOne.json())
        } as any;

        const test = await POST(testData);
        const operator = await test.json();
        expect(test.status).toBe(200);
        
        // Delete operator
        await (await Operator.findByPk(operator.id))?.destroy({ force: true });
    });

    // Obtener operadores
    test('Obtener operadores', async () => {
        const operators = await GET();
        expect(operators.status).toBe(200);
    });

    // Visualizar operador
    test('Visualizar operador', async () => {
        const operator = await GETOperator(null as any, { params: Promise.resolve({ id: '1' }) });
        expect(operator.status).toBe(200);
    });

    // Actualizar operador
    test('Actualizar operador', async () => {
        const operator = await Operator.create(toObject(await testOperatorOne.json()));
        const testData = {
            json: async () => toObject(await testOperatorOne.json())
        } as any;

        const response = await PUTOperator(testData, { params: Promise.resolve({ id: operator.id.toString() }) });
        expect(response.status).toBe(200);
        await operator.destroy({ force: true });
    });

    // Borrar operador
    test('Borrar operador', async () => {
        const operator = await Operator.create(toObject(await testOperatorOne.json()));
        const response = await DELETEOperator(null as any, { params: Promise.resolve({ id: operator.id.toString() }) });
        expect(response.status).toBe(200);
        await operator.destroy({ force: true });
    });

    // Borrar multiple operadores
    test('Borrar multiple operadores', async () => {
        const operatorOne = await Operator.create(toObject(await testOperatorOne.json()));
        const operatorTwo = await Operator.create(toObject(await testOperatorTwo.json()));

        const request = { json: async () => ({ ids: [operatorOne.id.toString(), operatorTwo.id.toString()] }) } as any;

        const response = await DELETE(request);
        expect(response.status).toBe(200);

        await operatorOne.destroy({ force: true });
        await operatorTwo.destroy({ force: true });
    });
});

