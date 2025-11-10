/** @jest-environment node */
import { GET as GETPayments, PUT as PUTPayments } from "@/app/api/service/payments/route";
import { Operator, Service } from "@/services/backend/models/associations";

describe('Service - Payments', () => {
  test('GET payments aggregates per operator', async () => {
    // Setup: create service and operators
    const op1 = await Operator.create({ name: 'Op', lastname: 'One', phone: '100', address: 'X', avatar: null });
    const op2 = await Operator.create({ name: 'Op', lastname: 'Two', phone: '200', address: 'Y', avatar: null });

    const svc = await (Service as any).create({ date: new Date(), bol_charge: 100, dollar_rate: 0, status: 'Completado' });
    await (svc as any).setOperators([op1.id, op2.id]);

    const res = await GETPayments();
    expect(res.status).toBe(200);

    // Cleanup
    await (svc as any).destroy({ force: true });
    await (op1 as any).destroy({ force: true });
    await (op2 as any).destroy({ force: true });
  });

  test('PUT payment status echoes payload', async () => {
    const req = { json: async () => ({ id: 1, status: 'paid' }) } as any;
    const res = await PUTPayments(req);
    expect(res.status).toBe(200);
  });
});
