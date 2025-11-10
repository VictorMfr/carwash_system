/** @jest-environment node */
import { GET as GETClients } from "@/app/api/marketing/clients/route";

describe('Marketing - Clients', () => {
  test('GET clientes marketing', async () => {
    const res = await GETClients();
    expect(res.status).toBe(200);
  });
});
