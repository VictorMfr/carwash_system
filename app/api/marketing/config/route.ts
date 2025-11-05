import { NextResponse } from "next/server";
import { getMarketingWeights, setMarketingWeights } from "@/services/backend/config/settings";

export async function GET() {
    try {
        const data = await getMarketingWeights();
        return NextResponse.json(data);
    } catch (e: any) {
        return NextResponse.json({ message: e?.message ?? 'Error leyendo configuración' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const payload: any = {};

        if (body?.loyaltyWeights) {
            const { a, b, c } = body.loyaltyWeights;
            payload.loyaltyWeights = { a, b, c };
        }

        if (body?.delinquencyWeights) {
            const { a, b } = body.delinquencyWeights;
            payload.delinquencyWeights = { a, b };
        }

        if (body?.marketingEligibility) {
            const { promotionMin, reminderMin } = body.marketingEligibility;
            payload.marketingEligibility = { promotionMin, reminderMin };
        }

        await setMarketingWeights(payload);
        const data = await getMarketingWeights();
        return NextResponse.json(data);
    } catch (e: any) {
        return NextResponse.json({ message: e?.message ?? 'Error guardando configuración' }, { status: 500 });
    }
}


