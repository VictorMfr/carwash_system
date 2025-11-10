/** @jest-environment node */
import { POST, GET, DELETE } from "@/app/api/stock/brand/route";
import { GET as GETBrand, PUT as PUTBrand, DELETE as DELETEBrand } from "@/app/api/stock/brand/[id]/route";
import { Brand } from "@/services/backend/models/associations";
import { toObject } from "../../util";

const testBrandOne = {
    json: async () => [
        { field: 'name', value: 'Test Brand One' },
    ] as any,
} as any;

const testBrandTwo = {
    json: async () => [
        { field: 'name', value: 'Test Brand Two' },
    ] as any,
} as any;

describe('Rutas de marca', () => {

    // Crear marca
    test('Crear marca', async () => {
        const testData = {
            json: async () => toObject(await testBrandOne.json())
        } as any;

        const test = await POST(testData);
        const brand = await test.json();
        expect(test.status).toBe(200);
        
        // Delete brand
        await (await Brand.findByPk(brand.id))?.destroy({ force: true });
    });

    // Obtener marcas
    test('Obtener marcas', async () => {
        const brands = await GET();
        expect(brands.status).toBe(200);
    });

    // Visualizar marca
    test('Visualizar marca', async () => {
        const brand = await GETBrand(null as any, { params: Promise.resolve({ id: '1' }) });
        expect(brand.status).toBe(200);
    });

    // Actualizar marca
    test('Actualizar marca', async () => {
        const brand = await Brand.create(toObject(await testBrandOne.json()));
        const testData = {
            json: async () => toObject(await testBrandOne.json())
        } as any;

        const response = await PUTBrand(testData, { params: Promise.resolve({ id: brand.id.toString() }) });
        expect(response.status).toBe(200);
        await brand.destroy({ force: true });
    });

    // Borrar marca
    test('Borrar marca', async () => {
        const brand = await Brand.create(toObject(await testBrandOne.json()));
        const response = await DELETEBrand(null as any, { params: Promise.resolve({ id: brand.id.toString() }) });
        expect(response.status).toBe(200);
        await brand.destroy({ force: true });
    });

    // Borrar multiple marcas
    test('Borrar multiple marcas', async () => {
        const brandOne = await Brand.create(toObject(await testBrandOne.json()));
        const brandTwo = await Brand.create(toObject(await testBrandTwo.json()));

        const request = { json: async () => ({ ids: [brandOne.id.toString(), brandTwo.id.toString()] }) } as any;

        const response = await DELETE(request);
        expect(response.status).toBe(200);

        await brandOne.destroy({ force: true });
        await brandTwo.destroy({ force: true });
    });
});

