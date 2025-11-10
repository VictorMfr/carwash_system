/** @jest-environment node */
import { POST, GET, DELETE } from "@/app/api/stock/product/route";
import { GET as GETProduct, PUT as PUTProduct, DELETE as DELETEProduct } from "@/app/api/stock/product/[id]/route";
import { Product } from "@/services/backend/models/associations";
import { toObject } from "../../util";

const testProductOne = {
    json: async () => [
        { field: 'name', value: 'Test Product One' },
        { field: 'unit', value: 'kg' },
        { field: 'isTool', value: false },
    ] as any,
} as any;

const testProductTwo = {
    json: async () => [
        { field: 'name', value: 'Test Product Two' },
        { field: 'unit', value: 'L' },
        { field: 'isTool', value: false },
    ] as any,
} as any;

describe('Rutas de producto', () => {

    // Crear producto
    test('Crear producto', async () => {
        const testData = {
            json: async () => toObject(await testProductOne.json())
        } as any;

        const test = await POST(testData);
        const product = await test.json();
        expect(test.status).toBe(200);
        
        // Delete product
        await (await Product.findByPk(product.id))?.destroy({ force: true });
    });

    // Obtener productos
    test('Obtener productos', async () => {
        const products = await GET({ url: 'http://localhost' } as any);
        expect(products.status).toBe(200);
    });

    // Visualizar producto
    test('Visualizar producto', async () => {
        const product = await GETProduct(null as any, { params: Promise.resolve({ id: '1' }) });
        expect(product.status).toBe(200);
    });

    // Actualizar producto
    test('Actualizar producto', async () => {
        const product = await Product.create(toObject(await testProductOne.json()));
        const testData = {
            json: async () => toObject(await testProductOne.json())
        } as any;

        const response = await PUTProduct(testData, { params: Promise.resolve({ id: product.id.toString() }) });
        expect(response.status).toBe(200);
        await product.destroy({ force: true });
    });

    // Borrar producto
    test('Borrar producto', async () => {
        const product = await Product.create(toObject(await testProductOne.json()));
        const response = await DELETEProduct(null as any, { params: Promise.resolve({ id: product.id.toString() }) });
        expect(response.status).toBe(200);
        await product.destroy({ force: true });
    });

    // Borrar multiple productos
    test('Borrar multiple productos', async () => {
        const productOne = await Product.create(toObject(await testProductOne.json()));
        const productTwo = await Product.create(toObject(await testProductTwo.json()));

        const request = { json: async () => ({ ids: [productOne.id.toString(), productTwo.id.toString()] }) } as any;

        const response = await DELETE(request);
        expect(response.status).toBe(200);

        await productOne.destroy({ force: true });
        await productTwo.destroy({ force: true });
    });
});

