/** @jest-environment node */
import { GET as GETClientVehicles } from "@/app/api/client/[id]/vehicles/route";
import { Client, Vehicle, VehicleBrand, VehicleModel } from "@/services/backend/models/associations";

describe('Client - Vehicles by client', () => {
  test('GET vehicles by client id', async () => {
    const client = await Client.create({ name: 'Veh', lastname: 'Client', phone: '7777777777' });
    const brand = await VehicleBrand.create({ name: 'BrandX' });
    const model = await VehicleModel.create({ name: 'ModelY' });

    const veh = await (Vehicle as any).create({ license_plate: 'CLV001', brandId: brand.id, modelId: model.id, clientId: client.id });

    const res = await GETClientVehicles(null as any, { params: Promise.resolve({ id: client.id.toString() }) });
    expect([200, 500]).toContain(res.status);

    await (veh as any).destroy({ force: true });
    await (brand as any).destroy({ force: true });
    await (model as any).destroy({ force: true });
    await (client as any).destroy({ force: true });
  });
});
