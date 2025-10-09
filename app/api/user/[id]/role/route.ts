import { User } from "@/services/backend/models/associations";
import { NextResponse } from "next/server";
import { AssignRolesSchema } from "@/lib/definitions";
import { handleServerError } from "@/lib/error";

// Get user roles
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const user = await User.findByPk(id);
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
        
        const roles = await user.getRoles();
        console.log(roles);
        return NextResponse.json(roles);
    } catch (error) {
        return handleServerError(error);
    }
}

// Update user roles
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { roles } = AssignRolesSchema.parse(body);
        const user = await User.findByPk(id);
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
        await user.setRoles(roles.map(role => Number(role)));
        return NextResponse.json(user);
    } catch (error) {
        return handleServerError(error);
    }
}