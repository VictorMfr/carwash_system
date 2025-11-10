/** @jest-environment node */
import { GET as GETAccountBalance } from "@/app/api/finance/account/balance/route";

describe('Finance - Account Balance', () => {
  test('GET account balances', async () => {
    const res = await GETAccountBalance();
    expect(res.status).toBe(200);
  });
});
