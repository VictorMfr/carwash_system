// Initialize database
import db from './backend/db';
import './backend/models/associations';
import createAccess from './backend/config/createAccess';

export const DB_CONNECTION_MESSAGES = {
    SUCCESS: 'Conexion a la base de datos exitosa',
    ERROR: 'Error con la conexion a la base de datos',
}

async function dbConfig() {
    await createAccess();
}

export async function initDatabase() {
    try {
        await db.sync({ force: true });
        await dbConfig();
        return DB_CONNECTION_MESSAGES.SUCCESS;
    } catch (error) {
        console.error('Error with sync:', DB_CONNECTION_MESSAGES.ERROR);
        throw error;
    }
}

export async function testConnection() {
    try {
        await db.authenticate();
        return DB_CONNECTION_MESSAGES.SUCCESS;
    } catch (error) {
        console.error('Error with connection:', DB_CONNECTION_MESSAGES.ERROR);
        throw error;
    }
}



