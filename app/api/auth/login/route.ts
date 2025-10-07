import { NextRequest, NextResponse } from "next/server";
import { createSession } from "@/lib/session";
import { User } from "@/services/backend/models/associations";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
    try {
        const contentType = request.headers.get("content-type") || "";
        let email: string | null = null;
        let password: string | null = null;

        if (contentType.includes("application/json")) {
            const body = await request.json();
            email = body?.email ?? null;
            password = body?.password ?? null;
        } else {
            const formData = await request.formData();
            email = (formData.get("email") as string) ?? null;
            password = (formData.get("password") as string) ?? null;
        }

        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required", message: null },
                { status: 400 }
            );
        }

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return NextResponse.json(
                { error: "User not found", message: null },
                { status: 401 }
            );
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json(
                { error: "Invalid password", message: null },
                { status: 401 }
            );
        }

        await createSession(user.id.toString());
        return NextResponse.json(
            { error: null, message: "Login successful" },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : String(error), message: null },
            { status: 500 }
        );
    }
}
