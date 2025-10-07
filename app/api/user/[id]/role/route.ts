import { User } from "@/services/backend/models/associations";
import { NextResponse } from "next/server";

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
        console.log(error);
        return NextResponse.json({ error: 'Error getting user roles' }, { status: 500 });
    }
}

// Update user roles
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const { roles } = await request.json();
        const user = await User.findByPk(id);
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
        await user.setRoles(roles);
        return NextResponse.json(user);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error updating user roles' }, { status: 500 });
    }
}