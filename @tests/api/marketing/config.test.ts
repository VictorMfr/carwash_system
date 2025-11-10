/** @jest-environment node */
import { GET as GETConfig, PUT as PUTConfig } from "@/app/api/marketing/config/route";

describe('Marketing - Config', () => {
  test('GET configuración', async () => {
    const res = await GETConfig();
    expect(res.status).toBe(200);
  });

  test('PUT configuración', async () => {
    const req = {
      json: async () => ({
        loyaltyWeights: { a: 0.4, b: 0.4, c: 0.2 },
        delinquencyWeights: { a: 0.5, b: 0.5 },
        marketingEligibility: { promotionMin: 0.7, reminderMin: 0.6 }
      })
    } as any;
    const res = await PUTConfig(req);
    expect(res.status).toBe(200);
  });
});
