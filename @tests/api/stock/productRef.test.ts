/** @jest-environment node */
import { GET as GETProductStockRef } from "@/app/api/stock/product/[id]/ref/route";
import { Product, Stock, User } from "@/services/backend/models/associations";

const createTestUser = async () => {
  const rnd = Math.random().toString(36).slice(2);
  const user = await (User as any).create({
    name: `Ref${rnd}`,
    lastname: "User",
    phone: "0000000000",
    address: "Test Address",
    email: `ref_${rnd}@example.com`,
    password: "hashed",
  });
  return user as any;
};

describe('Rutas de stock - product ref', () => {
  test('GET stock por producto', async () => {
    const product = await Product.create({ name: 'Ref Product', unit: 'kg', isTool: false });
    const user = await createTestUser();

    const stock = await Stock.create({ total_quantity: 0, minimum_quantity: 1 });
    await (stock as any).setProduct(product.id);
    await (stock as any).setUser(user.id);

    const res = await GETProductStockRef(null as any, { params: Promise.resolve({ id: product.id.toString() }) });
    expect(res.status).toBe(200);

    await (stock as any).destroy({ force: true }).catch(() => {});
    await product.destroy({ force: true });
    await (user as any).destroy({ force: true });
  });
});
