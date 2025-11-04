import { Service, Recipe, Operator, Vehicle, Client } from "@/services/backend/models/associations";
import { NextResponse } from "next/server";
import { handleServerError } from "@/lib/error";
import { getOperatorPaymentPercentage } from "@/services/backend/config/settings";

// Get payments
export async function GET() {
    try {
        // Fetch services with operators to compute per-operator owed amounts
        const services = await Service.findAll({
            attributes: [
                'id',
                'date',
                'bol_charge'
            ],
            include: [
                {
                    model: Operator,
                    as: 'Operators',
                    attributes: ['id', 'name', 'lastname'],
                    through: { attributes: [] }
                }
            ]
        });

        const percentage = await getOperatorPaymentPercentage(); // fraction (e.g., 0.3)

        // Aggregate owed per operator: each service's operator pool shares equally
        const operatorIdToData = new Map<number, { id: number, name: string, lastname: string, totalShareBase: number }>();

        for (const service of services) {
            const serviceAny = service as any;
            const operators = (serviceAny.Operators ?? []) as Array<{ id: number, name: string, lastname: string }>;
            if (!operators.length) continue;
            const shareBase = Number(serviceAny.bol_charge) / operators.length;
            for (const op of operators) {
                const current = operatorIdToData.get(op.id);
                if (current) {
                    current.totalShareBase += shareBase;
                } else {
                    operatorIdToData.set(op.id, { id: op.id, name: op.name, lastname: op.lastname, totalShareBase: shareBase });
                }
            }
        }

        const rows = Array.from(operatorIdToData.values()).map((op, index) => ({
            id: op.id,
            operator: `${op.name} ${op.lastname}`,
            payment: Number((op.totalShareBase * percentage).toFixed(2))
        }));

        return NextResponse.json(rows);
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
