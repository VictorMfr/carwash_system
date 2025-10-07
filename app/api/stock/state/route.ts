import { State } from "@/services/backend/models/associations";
import { NextResponse } from "next/server";

// Create state
export async function POST(request: Request) {
    try {
        const { name } = await request.json();

        const isStateInDB = await State.findOne({
            where: { name },
            paranoid: false
        });

        if (isStateInDB) {
            if (isStateInDB.isSoftDeleted()) {
                await isStateInDB.restore();
                return NextResponse.json(isStateInDB);
            } else {
                return NextResponse.json({ error: 'State already exists' }, { status: 400 });
            }
        } else {
            const state = await State.create({ name });
            return NextResponse.json(state);
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error creating state' }, { status: 500 });
    }
}

// Get states
export async function GET() {
    try {
        const states = await State.findAll();
        return NextResponse.json(states);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error getting states' }, { status: 500 });
    }
}

// Delete multiple states
export async function DELETE(request: Request) {
    try {
        const { ids } = await request.json();
        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return NextResponse.json({ error: 'No state IDs provided' }, { status: 400 });
        }

        const deletedCount = await State.destroy({ where: { id: ids } });
        return NextResponse.json({ message: `${deletedCount} states deleted successfully`, deletedCount });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error deleting states' }, { status: 500 });
    }
}

