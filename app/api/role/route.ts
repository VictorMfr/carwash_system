import { Role } from "@/services/backend/models/associations";
import { NextResponse } from "next/server";


// Get roles
export async function GET() {
    const roles = await Role.findAll();
    return NextResponse.json(roles);
}