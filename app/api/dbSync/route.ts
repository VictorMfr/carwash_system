// DB Sync

import { NextResponse } from 'next/server';
import { initDatabase } from '@/services/initDatabase';

export async function GET() {
    await initDatabase();
    return NextResponse.json({ message: 'Database synchronized' });
}