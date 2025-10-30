// Initialize database
import db from './backend/db';
import './backend/models/associations';
import createAccess from './backend/config/createAccess';

// import createTransactions from './backend/config/createTransactions';
// import createStocks from './backend/config/createStock';
// import createServices from './backend/config/createServices';

async function dbConfig() {
    await createAccess();
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



