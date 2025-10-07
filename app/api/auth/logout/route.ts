import { NextResponse } from "next/server";
import { destroySession } from "@/lib/session";

export async function POST() {
    try {
        await destroySession();
        return NextResponse.json(
            { message: "Logout successful" },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    }
}
