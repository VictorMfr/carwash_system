import { User } from "@/services/backend/models/associations";
import { NextResponse } from "next/server";
import { handleServerError } from "@/lib/error";
import { UserUpdateSchema } from "@/lib/definitions";

// Get user by id
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const user = await User.findByPk(id);
        return NextResponse.json(user);
    } catch (error) {
        return handleServerError(error);
    }
}

// Update user
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { name, lastname, phone, address, email } = UserUpdateSchema.parse(body);

        const user = await User.findByPk(id);

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        await user.update({ name, lastname, phone, address, email });
        return NextResponse.json(user);
    } catch (error) {
        return handleServerError(error);
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
        return handleServerError(error);
    }
}