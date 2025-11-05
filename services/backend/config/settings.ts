import { promises as fs } from 'fs';
import path from 'path';

type Settings = {
    operatorPaymentPercentage: number; // fraction, e.g., 0.3 for 30%
    loyaltyWeights?: { a: number; b: number; c: number };
    delinquencyWeights?: { a: number; b: number };
    marketingEligibility?: { promotionMin: number; reminderMin: number };
};

const SETTINGS_PATH = path.join(process.cwd(), 'services', 'backend', 'config', 'settings.json');

async function ensureSettingsFile(): Promise<void> {
    try {
        await fs.access(SETTINGS_PATH);
    } catch {
        const defaultSettings: Settings = {
            operatorPaymentPercentage: 0.3,
            loyaltyWeights: { a: 1 / 3, b: 1 / 3, c: 1 / 3 },
            delinquencyWeights: { a: 0.5, b: 0.5 },
            marketingEligibility: { promotionMin: 0.7, reminderMin: 0.6 },
        };
        await fs.mkdir(path.dirname(SETTINGS_PATH), { recursive: true });
        await fs.writeFile(SETTINGS_PATH, JSON.stringify(defaultSettings, null, 2), 'utf8');
    }
}

export async function getOperatorPaymentPercentage(): Promise<number> {
    await ensureSettingsFile();
    const raw = await fs.readFile(SETTINGS_PATH, 'utf8');
    const parsed: Settings = JSON.parse(raw);
    if (typeof parsed.operatorPaymentPercentage !== 'number' || isNaN(parsed.operatorPaymentPercentage)) {
        return 0.3;
    }
    return parsed.operatorPaymentPercentage;
}

export async function setOperatorPaymentPercentage(value: number): Promise<void> {
    const clamped = Math.max(0, Math.min(1, value));
    await ensureSettingsFile();
    const raw = await fs.readFile(SETTINGS_PATH, 'utf8');
    const parsed: Settings = JSON.parse(raw);
    parsed.operatorPaymentPercentage = clamped;
    await fs.writeFile(SETTINGS_PATH, JSON.stringify(parsed, null, 2), 'utf8');
}

export async function getMarketingWeights(): Promise<{ loyaltyWeights: { a: number; b: number; c: number }; delinquencyWeights: { a: number; b: number }; marketingEligibility: { promotionMin: number; reminderMin: number } }> {
    await ensureSettingsFile();
    const raw = await fs.readFile(SETTINGS_PATH, 'utf8');
    const parsed: Settings = JSON.parse(raw);
    const loyalty = parsed.loyaltyWeights ?? { a: 1 / 3, b: 1 / 3, c: 1 / 3 };
    const delinquency = parsed.delinquencyWeights ?? { a: 0.5, b: 0.5 };
    const clamp01 = (n: number) => Math.max(0, Math.min(1, Number(n) || 0));
    const eligibility = parsed.marketingEligibility ?? { promotionMin: 0.7, reminderMin: 0.6 };
    return {
        loyaltyWeights: { a: clamp01(loyalty.a), b: clamp01(loyalty.b), c: clamp01(loyalty.c) },
        delinquencyWeights: { a: clamp01(delinquency.a), b: clamp01(delinquency.b) },
        marketingEligibility: { promotionMin: clamp01(eligibility.promotionMin), reminderMin: clamp01(eligibility.reminderMin) },
    };
}

export async function setMarketingWeights(payload: { loyaltyWeights?: { a: number; b: number; c: number }; delinquencyWeights?: { a: number; b: number }; marketingEligibility?: { promotionMin: number; reminderMin: number } }): Promise<void> {
    await ensureSettingsFile();
    const raw = await fs.readFile(SETTINGS_PATH, 'utf8');
    const parsed: Settings = JSON.parse(raw);

    const clamp01 = (n: number) => Math.max(0, Math.min(1, Number(n) || 0));

    if (payload.loyaltyWeights) {
        const { a, b, c } = payload.loyaltyWeights;
        parsed.loyaltyWeights = { a: clamp01(a), b: clamp01(b), c: clamp01(c) };
    } else if (!parsed.loyaltyWeights) {
        parsed.loyaltyWeights = { a: 1 / 3, b: 1 / 3, c: 1 / 3 };
    }

    if (payload.delinquencyWeights) {
        const { a, b } = payload.delinquencyWeights;
        parsed.delinquencyWeights = { a: clamp01(a), b: clamp01(b) };
    } else if (!parsed.delinquencyWeights) {
        parsed.delinquencyWeights = { a: 0.5, b: 0.5 };
    }

    if (payload.marketingEligibility) {
        const { promotionMin, reminderMin } = payload.marketingEligibility;
        const clamp = (n: number) => Math.max(0, Math.min(1, Number(n) || 0));
        parsed.marketingEligibility = { promotionMin: clamp(promotionMin), reminderMin: clamp(reminderMin) };
    } else if (!parsed.marketingEligibility) {
        parsed.marketingEligibility = { promotionMin: 0.7, reminderMin: 0.6 };
    }

    await fs.writeFile(SETTINGS_PATH, JSON.stringify(parsed, null, 2), 'utf8');
}
