/** @jest-environment node */
import { POST, GET, DELETE } from "@/app/api/service/vehicle/model/route";
import { GET as GETVehicleModel, PUT as PUTVehicleModel, DELETE as DELETEVehicleModel } from "@/app/api/service/vehicle/model/[id]/route";
import { VehicleModel } from "@/services/backend/models/associations";
import { toObject } from "../../util";

const testVehicleModelOne = {
    json: async () => [
        { field: 'name', value: 'Test Vehicle Model One' },
    ] as any,
} as any;

const testVehicleModelTwo = {
    json: async () => [
        { field: 'name', value: 'Test Vehicle Model Two' },
    ] as any,
} as any;

describe('Rutas de modelo de vehículo', () => {

    // Crear modelo de vehículo
    test('Crear modelo de vehículo', async () => {
        const testData = {
            json: async () => toObject(await testVehicleModelOne.json())
        } as any;

        const test = await POST(testData);
        const model = await test.json();
        expect(test.status).toBe(200);
        
        // Delete model
        await (await VehicleModel.findByPk(model.id))?.destroy({ force: true });
    });

    // Obtener modelos de vehículo
    test('Obtener modelos de vehículo', async () => {
        const models = await GET();
        expect(models.status).toBe(200);
    });

    // Visualizar modelo de vehículo
    test('Visualizar modelo de vehículo', async () => {
        const model = await GETVehicleModel(null as any, { params: Promise.resolve({ id: '1' }) });
        expect(model.status).toBe(200);
    });

    // Actualizar modelo de vehículo
    test('Actualizar modelo de vehículo', async () => {
        const model = await VehicleModel.create(toObject(await testVehicleModelOne.json()));
        const testData = {
            json: async () => toObject(await testVehicleModelOne.json())
        } as any;

        const response = await PUTVehicleModel(testData, { params: Promise.resolve({ id: model.id.toString() }) });
        expect(response.status).toBe(200);
        await model.destroy({ force: true });
    });

    // Borrar modelo de vehículo
    test('Borrar modelo de vehículo', async () => {
        const model = await VehicleModel.create(toObject(await testVehicleModelOne.json()));
        const response = await DELETEVehicleModel(null as any, { params: Promise.resolve({ id: model.id.toString() }) });
        expect(response.status).toBe(200);
        await model.destroy({ force: true });
    });

    // Borrar multiple modelos de vehículo
    test('Borrar multiple modelos de vehículo', async () => {
        const modelOne = await VehicleModel.create(toObject(await testVehicleModelOne.json()));
        const modelTwo = await VehicleModel.create(toObject(await testVehicleModelTwo.json()));

        const request = { json: async () => ({ ids: [modelOne.id.toString(), modelTwo.id.toString()] }) } as any;

        const response = await DELETE(request);
        expect(response.status).toBe(200);

        await modelOne.destroy({ force: true });
        await modelTwo.destroy({ force: true });
    });
});

