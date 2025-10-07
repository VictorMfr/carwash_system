import { NextResponse } from "next/server";
import { handleServerError } from "@/lib/error";

// Update payment status for a specific service
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const { status } = await request.json();
        
        // In a real application, you would:
        // 1. Find the service by ID
        // 2. Update the payment status in a Payment table
        // 3. Or add a payment_status field to the Service model
        
        // For now, we'll just return success
        return NextResponse.json({ 
            message: 'Payment status updated successfully',
            id: parseInt(id),
            status 
        });
    } catch (error) {
        return handleServerError(error);
    }
}
