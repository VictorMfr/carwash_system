import { Vehicle, VehicleBrand, VehicleModel, Client } from "@/services/backend/models/associations";
import { NextResponse } from "next/server";

// Create vehicle
export async function POST(request: Request) {
    try {
        const { license_plate, brand, model, client } = await request.json();

        const isVehicleInDB = await Vehicle.findOne({ where: { license_plate }, paranoid: false });
        if (isVehicleInDB) {
            if (isVehicleInDB.isSoftDeleted()) {
                await isVehicleInDB.restore();
                return NextResponse.json(isVehicleInDB);
            } else {
                return NextResponse.json({ error: 'Vehicle already exists' }, { status: 400 });
            }
        }

        // Helpers to resolve FK by id or by name, creating if needed (with restore on soft-deleted)
        const resolveByNameOrId = async (value: any, Model: any) => {
            if (!value) return null;
            // numeric id
            if (typeof value === 'number') return value;
            // object with id
            if (typeof value === 'object' && value.id) return value.id;
            // get candidate name
            const candidateName = typeof value === 'string' ? value : (value.name ?? value.label);
            if (!candidateName) return null;
            const existing = await Model.findOne({ where: { name: candidateName }, paranoid: false });
            if (existing) {
                if (existing.isSoftDeleted && existing.isSoftDeleted()) {
                    await existing.restore();
                }
                return existing.id;
            }
            const created = await Model.create({ name: candidateName });
            return created.id;
        };

        const brandId = await resolveByNameOrId(brand, VehicleBrand);
        const modelId = await resolveByNameOrId(model, VehicleModel);

        // Client puede traer más campos; intentamos respetarlos si vienen
        let clientId: number | null = null;
        if (client) {
            if (typeof client === 'number') {
                clientId = client;
            } else if (typeof client === 'object' && client.id) {
                clientId = client.id;
            } else {
                const candidateName = typeof client === 'string' ? client : (client.name ?? client.label);
                const payload: any = { name: candidateName };
                if (typeof client === 'object') {
                    if (client.lastname) payload.lastname = client.lastname;
                    if (client.phone) payload.phone = client.phone;
                    if (client.address) payload.address = client.address;
                }
                const existingClient = await Client.findOne({ where: { name: payload.name }, paranoid: false });
                if (existingClient) {
                    if (existingClient.isSoftDeleted && existingClient.isSoftDeleted()) {
                        await existingClient.restore();
                    }
                    clientId = existingClient.id;
                } else {
                    const createdClient = await Client.create(payload);
                    clientId = createdClient.id;
                }
            }
        }

        const vehicle = await Vehicle.create({ license_plate, brandId: brandId ?? undefined, modelId: modelId ?? undefined, clientId: clientId ?? undefined });
        return NextResponse.json(vehicle);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error creating vehicle' }, { status: 500 });
    }
}

// Get vehicles
export async function GET() {
    try {
        const vehicles = await Vehicle.findAll({
            include: [
                { model: VehicleModel, as: 'VehicleModel' },
                { model: VehicleBrand, as: 'VehicleBrand' },
                { model: Client, as: 'Client' }
            ]
        });
        return NextResponse.json(vehicles);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error getting vehicles' }, { status: 500 });
    }
}

// Delete multiple vehicles
export async function DELETE(request: Request) {
    try {
        const { ids } = await request.json();
        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return NextResponse.json({ error: 'No vehicle IDs provided' }, { status: 400 });
        }
        const deletedCount = await Vehicle.destroy({ where: { id: ids } });
        return NextResponse.json({ message: `${deletedCount} vehicles deleted successfully`, deletedCount });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error deleting vehicles' }, { status: 500 });
    }
}

