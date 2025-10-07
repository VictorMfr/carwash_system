// Update Role
import { NextRequest, NextResponse } from "next/server";
import { Role } from "@/services/backend/models/associations";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const { name } = await request.json();
        const role = await Role.findByPk(id);
        if (!role) {
            return NextResponse.json({ error: 'Role not found' }, { status: 404 });
        }
        await role.update({ name });
        return NextResponse.json(role);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error updating role' }, { status: 500 });
    }
}