/** @jest-environment node */
import { POST, GET, DELETE } from "@/app/api/service/vehicle/route";
import { GET as GETVehicle, PUT as PUTVehicle, DELETE as DELETEVehicle } from "@/app/api/service/vehicle/[id]/route";
import { Vehicle, VehicleBrand, VehicleModel, Client } from "@/services/backend/models/associations";
import { toObject } from "../../util";

const testVehicleOne = {
    json: async () => [
        { field: 'license_plate', value: 'ABC123' },
        { field: 'brand', value: { name: 'Test Brand' } },
        { field: 'model', value: { name: 'Test Model' } },
        { field: 'client', value: { name: 'Test Client', lastname: 'One', phone: '1111111111' } },
    ] as any,
} as any;

const testVehicleTwo = {
    json: async () => [
        { field: 'license_plate', value: 'XYZ789' },
        { field: 'brand', value: { name: 'Test Brand 2' } },
        { field: 'model', value: { name: 'Test Model 2' } },
        { field: 'client', value: { name: 'Test Client', lastname: 'Two', phone: '2222222222' } },
    ] as any,
} as any;

describe('Rutas de vehículo', () => {

    // Crear vehículo
    test('Crear vehículo', async () => {
        const testData = {
            json: async () => toObject(await testVehicleOne.json())
        } as any;

        const test = await POST(testData);
        const vehicle = await test.json();
        expect(test.status).toBe(200);
        
        // Delete vehicle and related entities
        const createdVehicle = await Vehicle.findByPk(vehicle.id);
        if (createdVehicle) {
            await createdVehicle.destroy({ force: true });
        }
        // Clean up created brand, model, and client if they were created
        const brand = await VehicleBrand.findOne({ where: { name: 'Test Brand' } });
        if (brand) await brand.destroy({ force: true });
        const model = await VehicleModel.findOne({ where: { name: 'Test Model' } });
        if (model) await model.destroy({ force: true });
        const client = await Client.findOne({ where: { phone: '1111111111' } });
        if (client) await client.destroy({ force: true });
    });

    // Obtener vehículos
    test('Obtener vehículos', async () => {
        const vehicles = await GET();
        expect(vehicles.status).toBe(200);
    });

    // Visualizar vehículo
    test('Visualizar vehículo', async () => {
        const vehicle = await GETVehicle(null as any, { params: Promise.resolve({ id: '1' }) });
        expect(vehicle.status).toBe(200);
    });

    // Actualizar vehículo
    test('Actualizar vehículo', async () => {
        const brand = await VehicleBrand.create({ name: 'Test Brand Update' });
        const model = await VehicleModel.create({ name: 'Test Model Update' });
        const client = await Client.create({ name: 'Test Client', lastname: 'Update', phone: '3333333333' });
        
        const vehicle = await Vehicle.create({ 
            license_plate: 'UPDATE123',
            brandId: brand.id,
            modelId: model.id,
            clientId: client.id
        });

        const testData = {
            json: async () => ({
                license_plate: 'UPDATED123'
            })
        } as any;

        const response = await PUTVehicle(testData, { params: Promise.resolve({ id: vehicle.id.toString() }) });
        expect(response.status).toBe(200);
        
        await vehicle.destroy({ force: true });
        await brand.destroy({ force: true });
        await model.destroy({ force: true });
        await client.destroy({ force: true });
    });

    // Borrar vehículo
    test('Borrar vehículo', async () => {
        const brand = await VehicleBrand.create({ name: 'Test Brand Delete' });
        const model = await VehicleModel.create({ name: 'Test Model Delete' });
        const client = await Client.create({ name: 'Test Client', lastname: 'Delete', phone: '4444444444' });
        
        const vehicle = await Vehicle.create({ 
            license_plate: 'DELETE123',
            brandId: brand.id,
            modelId: model.id,
            clientId: client.id
        });

        const response = await DELETEVehicle(null as any, { params: Promise.resolve({ id: vehicle.id.toString() }) });
        expect(response.status).toBe(200);
        
        await vehicle.destroy({ force: true });
        await brand.destroy({ force: true });
        await model.destroy({ force: true });
        await client.destroy({ force: true });
    });

    // Borrar multiple vehículos
    test('Borrar multiple vehículos', async () => {
        const brandOne = await VehicleBrand.create({ name: 'Test Brand Delete 1' });
        const modelOne = await VehicleModel.create({ name: 'Test Model Delete 1' });
        const clientOne = await Client.create({ name: 'Test Client', lastname: 'Delete1', phone: '5555555555' });
        
        const brandTwo = await VehicleBrand.create({ name: 'Test Brand Delete 2' });
        const modelTwo = await VehicleModel.create({ name: 'Test Model Delete 2' });
        const clientTwo = await Client.create({ name: 'Test Client', lastname: 'Delete2', phone: '6666666666' });

        const vehicleOne = await Vehicle.create({ 
            license_plate: 'DELETE001',
            brandId: brandOne.id,
            modelId: modelOne.id,
            clientId: clientOne.id
        });

        const vehicleTwo = await Vehicle.create({ 
            license_plate: 'DELETE002',
            brandId: brandTwo.id,
            modelId: modelTwo.id,
            clientId: clientTwo.id
        });

        const request = { json: async () => ({ ids: [vehicleOne.id.toString(), vehicleTwo.id.toString()] }) } as any;

        const response = await DELETE(request);
        expect(response.status).toBe(200);

        await vehicleOne.destroy({ force: true });
        await vehicleTwo.destroy({ force: true });
        await brandOne.destroy({ force: true });
        await brandTwo.destroy({ force: true });
        await modelOne.destroy({ force: true });
        await modelTwo.destroy({ force: true });
        await clientOne.destroy({ force: true });
        await clientTwo.destroy({ force: true });
    });
});

