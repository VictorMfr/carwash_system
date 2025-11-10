/** @jest-environment node */
import { GET as GETStats } from "@/app/api/marketing/statistics/route";

describe('Marketing - Statistics', () => {
  test('GET estadísticas marketing', async () => {
    const res = await GETStats();
    expect(res.status).toBe(200);
  });
});
