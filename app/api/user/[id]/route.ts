import { User } from "@/services/backend/models/associations";
import { NextResponse } from "next/server";

// Get user by id
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const user = await User.findByPk(id);
        return NextResponse.json(user);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error getting user' }, { status: 500 });
    }
}

// Update user
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const { name, lastname, phone, address, email, password } = await request.json();

        const user = await User.findByPk(id);

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        await user.update({ name, lastname, phone, address, email, password });
        return NextResponse.json(user);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error updating user' }, { status: 500 });
    }
}

// Delete user
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const user = await User.findByPk(id);
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
        await user.destroy();
        return NextResponse.json(user);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error deleting user' }, { status: 500 });
    }
}