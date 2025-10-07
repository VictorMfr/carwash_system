// Initialize database
import db from './backend/db';
import './backend/models/associations';
import createUsers from './backend/config/auth/createUsers';
import createRoles from './backend/config/auth/createRoles';
import assignRoles from './backend/config/auth/assignRoles';
import createTransactions from './backend/config/finance/createTransactions';
import createStocks from './backend/config/stock/createStock';
import createServices from './backend/config/service/createServices';

async function dbConfig() {
    await createUsers();
    await createRoles();
    await assignRoles();
    await createTransactions();
    await createStocks();
    await createServices();
}

export async function initDatabase() {
    await db.sync({ force: true });
    console.log('Database synchronized');
    await dbConfig();
    console.log('Database configured');
}



