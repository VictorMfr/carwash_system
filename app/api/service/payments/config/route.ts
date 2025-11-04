import { NextResponse } from "next/server";
import { handleServerError } from "@/lib/error";
import { getOperatorPaymentPercentage, setOperatorPaymentPercentage } from "@/services/backend/config/settings";

export async function GET() {
    try {
        const percentage = await getOperatorPaymentPercentage();
        return NextResponse.json({ operatorPaymentPercentage: percentage });
    } catch (error) {
        return handleServerError(error);
    }
}

export async function PUT(request: Request) {
    try {
        const { operatorPaymentPercentage } = await request.json();
        if (typeof operatorPaymentPercentage !== 'number' || isNaN(operatorPaymentPercentage)) {
            return NextResponse.json({ message: 'operatorPaymentPercentage debe ser un número' }, { status: 400 });
        }
        await setOperatorPaymentPercentage(operatorPaymentPercentage);
        return NextResponse.json({ operatorPaymentPercentage });
    } catch (error) {
        return handleServerError(error);
    }
}


