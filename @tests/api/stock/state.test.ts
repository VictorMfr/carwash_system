/** @jest-environment node */
import { POST, GET, DELETE } from "@/app/api/stock/state/route";
import { GET as GETState, PUT as PUTState, DELETE as DELETEState } from "@/app/api/stock/state/[id]/route";
import { State } from "@/services/backend/models/associations";
import { toObject } from "../../util";

const testStateOne = {
    json: async () => [
        { field: 'name', value: 'Test State One' },
    ] as any,
} as any;

const testStateTwo = {
    json: async () => [
        { field: 'name', value: 'Test State Two' },
    ] as any,
} as any;

describe('Rutas de estado', () => {

    // Crear estado
    test('Crear estado', async () => {
        const testData = {
            json: async () => toObject(await testStateOne.json())
        } as any;

        const test = await POST(testData);
        const state = await test.json();
        expect(test.status).toBe(200);
        
        // Delete state
        await (await State.findByPk(state.id))?.destroy({ force: true });
    });

    // Obtener estados
    test('Obtener estados', async () => {
        const states = await GET();
        expect(states.status).toBe(200);
    });

    // Visualizar estado
    test('Visualizar estado', async () => {
        const state = await GETState(null as any, { params: Promise.resolve({ id: '1' }) });
        expect(state.status).toBe(200);
    });

    // Actualizar estado
    test('Actualizar estado', async () => {
        const state = await State.create(toObject(await testStateOne.json()));
        const testData = {
            json: async () => toObject(await testStateOne.json())
        } as any;

        const response = await PUTState(testData, { params: Promise.resolve({ id: state.id.toString() }) });
        expect(response.status).toBe(200);
        await state.destroy({ force: true });
    });

    // Borrar estado
    test('Borrar estado', async () => {
        const state = await State.create(toObject(await testStateOne.json()));
        const response = await DELETEState(null as any, { params: Promise.resolve({ id: state.id.toString() }) });
        expect(response.status).toBe(200);
        await state.destroy({ force: true });
    });

    // Borrar multiple estados
    test('Borrar multiple estados', async () => {
        const stateOne = await State.create(toObject(await testStateOne.json()));
        const stateTwo = await State.create(toObject(await testStateTwo.json()));

        const request = { json: async () => ({ ids: [stateOne.id.toString(), stateTwo.id.toString()] }) } as any;

        const response = await DELETE(request);
        expect(response.status).toBe(200);

        await stateOne.destroy({ force: true });
        await stateTwo.destroy({ force: true });
    });
});

