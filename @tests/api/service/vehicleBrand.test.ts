/** @jest-environment node */
import { POST, GET, DELETE } from "@/app/api/service/vehicle/brand/route";
import { GET as GETVehicleBrand, PUT as PUTVehicleBrand, DELETE as DELETEVehicleBrand } from "@/app/api/service/vehicle/brand/[id]/route";
import { VehicleBrand } from "@/services/backend/models/associations";
import { toObject } from "../../util";

const testVehicleBrandOne = {
    json: async () => [
        { field: 'name', value: 'Test Vehicle Brand One' },
    ] as any,
} as any;

const testVehicleBrandTwo = {
    json: async () => [
        { field: 'name', value: 'Test Vehicle Brand Two' },
    ] as any,
} as any;

describe('Rutas de marca de vehículo', () => {

    // Crear marca de vehículo
    test('Crear marca de vehículo', async () => {
        const testData = {
            json: async () => toObject(await testVehicleBrandOne.json())
        } as any;

        const test = await POST(testData);
        const brand = await test.json();
        expect(test.status).toBe(200);
        
        // Delete brand
        await (await VehicleBrand.findByPk(brand.id))?.destroy({ force: true });
    });

    // Obtener marcas de vehículo
    test('Obtener marcas de vehículo', async () => {
        const brands = await GET();
        expect(brands.status).toBe(200);
    });

    // Visualizar marca de vehículo
    test('Visualizar marca de vehículo', async () => {
        const brand = await GETVehicleBrand(null as any, { params: Promise.resolve({ id: '1' }) });
        expect(brand.status).toBe(200);
    });

    // Actualizar marca de vehículo
    test('Actualizar marca de vehículo', async () => {
        const brand = await VehicleBrand.create(toObject(await testVehicleBrandOne.json()));
        const testData = {
            json: async () => toObject(await testVehicleBrandOne.json())
        } as any;

        const response = await PUTVehicleBrand(testData, { params: Promise.resolve({ id: brand.id.toString() }) });
        expect(response.status).toBe(200);
        await brand.destroy({ force: true });
    });

    // Borrar marca de vehículo
    test('Borrar marca de vehículo', async () => {
        const brand = await VehicleBrand.create(toObject(await testVehicleBrandOne.json()));
        const response = await DELETEVehicleBrand(null as any, { params: Promise.resolve({ id: brand.id.toString() }) });
        expect(response.status).toBe(200);
        await brand.destroy({ force: true });
    });

    // Borrar multiple marcas de vehículo
    test('Borrar multiple marcas de vehículo', async () => {
        const brandOne = await VehicleBrand.create(toObject(await testVehicleBrandOne.json()));
        const brandTwo = await VehicleBrand.create(toObject(await testVehicleBrandTwo.json()));

        const request = { json: async () => ({ ids: [brandOne.id.toString(), brandTwo.id.toString()] }) } as any;

        const response = await DELETE(request);
        expect(response.status).toBe(200);

        await brandOne.destroy({ force: true });
        await brandTwo.destroy({ force: true });
    });
});

