import { NextRequest, NextResponse } from "next/server";
import { createSession } from "@/lib/session";
import { User } from "@/services/backend/models/associations";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            throw new Error("Email and password are required");
        }
        
        const user = await User.findOne({ where: { email } });


        if (!user) {
            throw new Error("Email or password is incorrect");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid || !user) {
            throw new Error("Email or password is incorrect");
        }

        await createSession(user.id.toString());
        
        return NextResponse.json({}, { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { error: 'Ocurrió un error desconocido' },
            { status: 500 }
        );
    }
}
