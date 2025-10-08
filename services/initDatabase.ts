// Initialize database
import db from './backend/db';
import './backend/models/associations';
import createAccess from './backend/config/auth/createAccess';

import createTransactions from './backend/config/finance/createTransactions';
import createStocks from './backend/config/stock/createStock';
import createServices from './backend/config/service/createServices';

async function dbConfig() {
    await createAccess();
    await createTransactions();
    await createStocks();
    await createServices();
}

export async function initDatabase() {
    try {
        await db.sync({ force: true });
        await dbConfig();
    } catch (error) {
        console.error('Error with sync:', error);
        throw error;
    }
}



