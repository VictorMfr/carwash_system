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
    try {
        // Primero intentar sincronizar sin forzar
        await db.sync();
        console.log('Database synchronized');
        
        // Luego configurar los datos
        await dbConfig();
        console.log('Database configured');
    } catch (error) {
        console.error('Error with alter sync, trying force sync:', error);
        try {
            // Si falla, usar force: true
            await db.sync();
            console.log('Database force synchronized');
            await dbConfig();
            console.log('Database configured');
        } catch (forceError) {
            console.error('Error with force sync:', forceError);
            throw forceError;
        }
    }
}



