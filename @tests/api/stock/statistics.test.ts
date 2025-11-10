/** @jest-environment node */
import { GET as GETStockStatistics } from "@/app/api/stock/statistics/route";

// Simple test to ensure endpoint responds
describe('Rutas de stock - estadísticas', () => {
  test('GET estadísticas debe retornar 200', async () => {
    const res = await GETStockStatistics();
    expect(res.status).toBe(200);
  });
});
