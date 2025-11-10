/** @jest-environment node */
import { GET as GETStocks, DELETE as DELETEStocks, POST as POSTStock } from "@/app/api/stock/route";
import { GET as GETStock, PUT as PUTStock, DELETE as DELETEStock } from "@/app/api/stock/[id]/route";
import { Product, Stock, User } from "@/services/backend/models/associations";

// Helper to create a user
const createTestUser = async () => {
  const rnd = Math.random().toString(36).slice(2);
  const user = await (User as any).create({
    name: `Test${rnd}`,
    lastname: "User",
    phone: "0000000000",
    address: "Test Address",
    email: `test_${rnd}@example.com`,
    password: "hashed",
  });
  return user as any;
};

describe('Rutas de stock (main y por id)', () => {
  test('POST sin sesión debe retornar error (400/500)', async () => {
    const request = { json: async () => ({ product: { id: 1, name: 'X' }, minimum_quantity: 1 }) } as any;
    const res = await POSTStock(request);
    expect([400, 500]).toContain(res.status);
  });

  test('GET stocks debe retornar 200', async () => {
    const res = await GETStocks();
    expect(res.status).toBe(200);
  });

  test('GET/PUT/DELETE por id', async () => {
    // Crear dependencias
    const product = await Product.create({ name: 'Stock Main Test', unit: 'kg', isTool: false });
    const user = await createTestUser();

    // Crear stock vía modelo
    const stock = await Stock.create({ total_quantity: 0, minimum_quantity: 5 });
    await (stock as any).setProduct(product.id);
    await (stock as any).setUser(user.id);

    // GET por id
    const getRes = await GETStock(null as any, { params: Promise.resolve({ id: stock.id.toString() }) });
    expect(getRes.status).toBe(200);

    // PUT por id
    const putReq = { json: async () => ({ minimum_quantity: 15 }) } as any;
    const putRes = await PUTStock(putReq, { params: Promise.resolve({ id: stock.id.toString() }) });
    expect(putRes.status).toBe(200);

    // DELETE por id
    const delRes = await DELETEStock(null as any, { params: Promise.resolve({ id: stock.id.toString() }) });
    expect(delRes.status).toBe(200);

    // Cleanup forzado por si falló el delete de ruta
    await (stock as any).destroy({ force: true }).catch(() => {});
    await product.destroy({ force: true });
    await (user as any).destroy({ force: true });
  });

  test('DELETE múltiple (bulk)', async () => {
    // Crear dependencias
    const productA = await Product.create({ name: 'Bulk A', unit: 'kg', isTool: false });
    const productB = await Product.create({ name: 'Bulk B', unit: 'kg', isTool: false });
    const user = await createTestUser();

    const stockA = await Stock.create({ total_quantity: 0, minimum_quantity: 1 });
    await (stockA as any).setProduct(productA.id);
    await (stockA as any).setUser(user.id);

    const stockB = await Stock.create({ total_quantity: 0, minimum_quantity: 2 });
    await (stockB as any).setProduct(productB.id);
    await (stockB as any).setUser(user.id);

    const req = { json: async () => ({ ids: [stockA.id.toString(), stockB.id.toString()] }) } as any;
    const res = await DELETEStocks(req);
    expect(res.status).toBe(200);

    // Cleanup
    await (stockA as any).destroy({ force: true }).catch(() => {});
    await (stockB as any).destroy({ force: true }).catch(() => {});
    await productA.destroy({ force: true });
    await productB.destroy({ force: true });
    await (user as any).destroy({ force: true });
  });
});
