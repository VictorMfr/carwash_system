import { promises as fs } from 'fs';
import path from 'path';

type Settings = {
    operatorPaymentPercentage: number; // fraction, e.g., 0.3 for 30%
};

const SETTINGS_PATH = path.join(process.cwd(), 'services', 'backend', 'config', 'settings.json');

async function ensureSettingsFile(): Promise<void> {
    try {
        await fs.access(SETTINGS_PATH);
    } catch {
        const defaultSettings: Settings = { operatorPaymentPercentage: 0.3 };
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


