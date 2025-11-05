import { NextResponse } from "next/server";
import { Client, Service, Vehicle } from "@/services/backend/models/associations";
import { getMarketingWeights } from "@/services/backend/config/settings";

type ClientRow = {
    id: number;
    name: string;
    lastname: string;
    phone: string;
    totalSpent: number;
    serviceCount: number;
    lastServiceDate: Date | null;
    pendingAmount: number;
    pendingCount: number;
    loyaltyIndex?: number;
    delinquencyIndex?: number;
    promotionEligible?: boolean;
    reminderEligible?: boolean;
};

function minMaxNormalize(values: number[]): { normalize: (v: number) => number } {
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min;
    return { normalize: (v: number) => (range === 0 ? 1 : (v - min) / range) };
}

export async function GET() {
    try {
        const weights = await getMarketingWeights();

        const clients = await Client.findAll({ attributes: ['id', 'name', 'lastname', 'phone'], raw: true });
        const services = await Service.findAll({
            attributes: ['id', 'date', 'bol_charge', 'status'],
            include: [{
                model: Vehicle,
                as: 'Vehicle',
                attributes: ['id'],
                include: [{ model: Client, as: 'Client', attributes: ['id'] }]
            }],
            raw: false,
            subQuery: false,
        });

        const map = new Map<number, ClientRow>();

        for (const c of clients as any[]) {
            map.set(c.id, {
                id: c.id,
                name: c.name ?? 'N/A',
                lastname: c.lastname ?? '',
                phone: c.phone ?? '',
                totalSpent: 0,
                serviceCount: 0,
                lastServiceDate: null,
                pendingAmount: 0,
                pendingCount: 0,
            });
        }

        for (const s of services as any[]) {
            const vehicle = s.Vehicle as any;
            const client = vehicle?.Client as any;
            const clientId = client?.id as number | undefined;
            if (!clientId) continue;
            if (!map.has(clientId)) continue;
            const row = map.get(clientId)!;
            const amount = Number(s.bol_charge) || 0;
            row.totalSpent += amount;
            row.serviceCount += 1;
            const dt = new Date(s.date);
            if (!row.lastServiceDate || dt > row.lastServiceDate) row.lastServiceDate = dt;
            if (String(s.status) === 'Pendiente') {
                row.pendingAmount += amount;
                row.pendingCount += 1;
            }
        }

        const rows = Array.from(map.values());

        const a_spent = rows.map(r => r.totalSpent);
        const b_count = rows.map(r => r.serviceCount);
        const daysSinceLast = rows.map(r => {
            if (!r.lastServiceDate) return Number.MAX_SAFE_INTEGER / 2;
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

        for (let i = 0; i < rows.length; i++) {
            const r = rows[i];
            const a = normA.normalize(r.totalSpent);
            const b = normB.normalize(r.serviceCount);
            const c = 1 - normDays.normalize(daysSinceLast[i]);
            const loyalty = b * weights.loyaltyWeights.b + a * weights.loyaltyWeights.a + c * weights.loyaltyWeights.c;
            r.loyaltyIndex = Number.isFinite(loyalty) ? loyalty : 0;

            const ap = normAPending.normalize(r.pendingAmount);
            const bp = normBPending.normalize(r.pendingCount);
            const delinquency = bp * weights.delinquencyWeights.b + ap * weights.delinquencyWeights.a;
            r.delinquencyIndex = Number.isFinite(delinquency) ? delinquency : 0;

            r.promotionEligible = r.loyaltyIndex >= (weights.marketingEligibility?.promotionMin ?? 0.7);
            r.reminderEligible = r.delinquencyIndex >= (weights.marketingEligibility?.reminderMin ?? 0.6);
        }

        return NextResponse.json(rows);
    } catch (e: any) {
        return NextResponse.json({ message: e?.message ?? 'Error listando clientes' }, { status: 500 });
    }
}


