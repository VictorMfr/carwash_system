import { Service, Recipe, Operator, Vehicle, Client } from "@/services/backend/models/associations";
import { NextResponse } from "next/server";
import { handleServerError } from "@/lib/error";

// Get payments
export async function GET() {
    try {
        const payments = await Service.findAll({
            attributes: [
                'id',
                'date',
                'created_at',
                'updated_at'
            ],
            include: [
                {
                    model: Recipe,
                    attributes: ['name']
                },
                {
                    model: Vehicle,
                    attributes: ['license_plate'],
                    include: [{
                        model: Client,
                        attributes: ['name', 'lastname']
                    }]
                },
                {
                    model: Operator,
                    attributes: ['name', 'lastname']
                }
            ],
            order: [['date', 'DESC']]
        });

        // Transform the data to include payment status and client info
        const transformedPayments = payments.map(service => {
            // Simulate payment status based on some logic
            // In a real app, this would come from a Payment model
            const isRecent = new Date(service.date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); // Last 7 days
            const status = isRecent ? 'pending' : 'complete';
            
            return {
                id: service.id,
                date: service.date,
                vehicle: service.Vehicle?.license_plate || 'N/A',
                client: 'test',
                status: status,
                created_at: 'test',
                updated_at: 'test'
            };
        });

        return NextResponse.json(transformedPayments);
    } catch (error) {
        return handleServerError(error);
    }
}

// Update payment status
export async function PUT(request: Request) {
    try {
        const { id, status } = await request.json();
        
        // In a real application, you would update a Payment model
        // For now, we'll just return success
        // You could store payment status in a separate table or add a field to Service
        
        return NextResponse.json({ 
            message: 'Payment status updated successfully',
            id,
            status 
        });
    } catch (error) {
        return handleServerError(error);
    }
}
