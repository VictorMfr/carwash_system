import { NextResponse } from "next/server";
import { Client, Service, Vehicle } from "@/services/backend/models/associations";
import { getMarketingWeights } from "@/services/backend/config/settings";

type ClientAgg = {
    clientId: number;
    name: string;
    lastname: string;
    totalSpent: number; // a
    serviceCount: number; // b
    lastServiceDate: Date | null; // for c
    pendingAmount: number; // a (delinquency)
    pendingCount: number; // b (delinquency)
};

function minMaxNormalize(values: number[]): { normalize: (v: number) => number } {
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min;
    return {
        normalize: (v: number) => (range === 0 ? 1 : (v - min) / range),
    };
}

export async function GET() {
    try {
        const weights = await getMarketingWeights();

        const services = await Service.findAll({
            attributes: ['id', 'date', 'bol_charge', 'status'],
            include: [{
                model: Vehicle,
                as: 'Vehicle',
                attributes: ['id'],
                include: [{
                    model: Client,
                    as: 'Client',
                    attributes: ['id', 'name', 'lastname']
                }]
            }],
            raw: false,
            subQuery: false
        });

        const map = new Map<number, ClientAgg>();

        for (const s of services as any[]) {
            const vehicle = s.Vehicle as any;
            const client = vehicle?.Client as any;
            if (!client?.id) continue;
            const id = client.id as number;
            if (!map.has(id)) {
                map.set(id, {
                    clientId: id,
                    name: client.name ?? 'N/A',
                    lastname: client.lastname ?? '',
                    totalSpent: 0,
                    serviceCount: 0,
                    lastServiceDate: null,
                    pendingAmount: 0,
                    pendingCount: 0,
                });
            }
            const agg = map.get(id)!;
            const amount = Number(s.bol_charge) || 0;
            agg.totalSpent += amount;
            agg.serviceCount += 1;
            const dt = new Date(s.date);
            if (!agg.lastServiceDate || dt > agg.lastServiceDate) agg.lastServiceDate = dt;
            if (String(s.status) === 'Pendiente') {
                agg.pendingAmount += amount;
                agg.pendingCount += 1;
            }
        }

        const rows = Array.from(map.values());

        // Build arrays for normalization
        const a_spent = rows.map(r => r.totalSpent);
        const b_count = rows.map(r => r.serviceCount);
        const daysSinceLast = rows.map(r => {
            if (!r.lastServiceDate) return Number.MAX_SAFE_INTEGER / 2; // very old if none
            const diffMs = Date.now() - r.lastServiceDate.getTime();
            return Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
        });
        const a_pending = rows.map(r => r.pendingAmount);
        const b_pending = rows.map(r => r.pendingCount);

        const normA = minMaxNormalize(a_spent);
        const normB = minMaxNormalize(b_count);
        const normDays = minMaxNormalize(daysSinceLast);
        const normAPending = minMaxNormalize(a_pending);
        const normBPending = minMaxNormalize(b_pending);

        const loyal = rows.map((r, idx) => {
            const a = normA.normalize(r.totalSpent);
            const b = normB.normalize(r.serviceCount);
            const c = 1 - normDays.normalize(daysSinceLast[idx]);
            const value = b * weights.loyaltyWeights.b + a * weights.loyaltyWeights.a + c * weights.loyaltyWeights.c;
            const promotionEligible = value >= (weights.marketingEligibility?.promotionMin ?? 0.7);
            return { id: r.clientId, value, label: `${r.name} ${r.lastname}`.trim(), promotionEligible };
        }).sort((x, y) => y.value - x.value).slice(0, 10);

        const delinquent = rows.map((r) => {
            const a = normAPending.normalize(r.pendingAmount);
            const b = normBPending.normalize(r.pendingCount);
            const value = b * weights.delinquencyWeights.b + a * weights.delinquencyWeights.a;
            const reminderEligible = value >= (weights.marketingEligibility?.reminderMin ?? 0.6);
            return { id: r.clientId, value, label: `${r.name} ${r.lastname}`.trim(), reminderEligible };
        }).sort((x, y) => y.value - x.value).slice(0, 10);

        const frequent = rows.map((r) => ({ id: r.clientId, value: r.serviceCount, label: `${r.name} ${r.lastname}`.trim() }))
            .sort((x, y) => y.value - x.value)
            .slice(0, 10);

        return NextResponse.json({
            loyalClients: loyal,
            delinquentClients: delinquent,
            frequentClients: frequent,
        });
    } catch (e: any) {
        return NextResponse.json({ message: e?.message ?? 'Error generando estadísticas' }, { status: 500 });
    }
}


