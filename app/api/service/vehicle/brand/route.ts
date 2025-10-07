import { VehicleBrand } from "@/services/backend/models/associations";
import { NextResponse } from "next/server";

// Create vehicle brand
export async function POST(request: Request) {
    try {
        const { name } = await request.json();

        const isBrandInDB = await VehicleBrand.findOne({ where: { name }, paranoid: false });
        if (isBrandInDB) {
            if (isBrandInDB.isSoftDeleted()) {
                await isBrandInDB.restore();
                return NextResponse.json(isBrandInDB);
            } else {
                return NextResponse.json({ error: 'Brand already exists' }, { status: 400 });
            }
        }

        const brand = await VehicleBrand.create({ name });
        return NextResponse.json(brand);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error creating brand' }, { status: 500 });
    }
}

// Get vehicle brands
export async function GET() {
    try {
        const brands = await VehicleBrand.findAll();
        return NextResponse.json(brands);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error getting brands' }, { status: 500 });
    }
}

// Delete multiple vehicle brands
export async function DELETE(request: Request) {
    try {
        const { ids } = await request.json();
        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return NextResponse.json({ error: 'No brand IDs provided' }, { status: 400 });
        }
        const deletedCount = await VehicleBrand.destroy({ where: { id: ids } });
        return NextResponse.json({ message: `${deletedCount} brands deleted successfully`, deletedCount });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error deleting brands' }, { status: 500 });
    }
}

