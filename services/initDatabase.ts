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
        await db.sync({ alter: true });
        console.log('Database synchronized');
        
        // Luego configurar los datos
        await dbConfig();
        console.log('Database configured');
    } catch (error) {
        console.error('Error with alter sync, trying force sync:', error);
        try {
            // Si falla, usar force: true
            await db.sync({ force: true });
            console.log('Database force synchronized');
            await dbConfig();
            console.log('Database configured');
        } catch (forceError) {
            console.error('Error with force sync:', forceError);
            // Si falla también, intentar sincronización manual
            try {
                console.log('Trying manual table creation...');
                await createTablesManually();
                await dbConfig();
                console.log('Database configured manually');
            } catch (manualError) {
                console.error('Error with manual sync:', manualError);
                throw manualError;
            }
        }
    }
}

async function createTablesManually() {
    // Crear tablas en orden específico para evitar problemas de foreign keys
    const { User, Role, Stock, Product, StockDetails, Brand, State, Recipe, Service, Vehicle, Operator, VehicleBrand, VehicleModel, Account, Method, Type, Client, Transaction } = await import('./backend/models/associations');
    
    // 1. Crear tablas padre primero
    await User.sync({ force: true });
    await Role.sync({ force: true });
    await Product.sync({ force: true });
    await Brand.sync({ force: true });
    await State.sync({ force: true });
    await Recipe.sync({ force: true });
    await Operator.sync({ force: true });
    await VehicleBrand.sync({ force: true });
    await VehicleModel.sync({ force: true });
    await Client.sync({ force: true });
    await Account.sync({ force: true });
    await Type.sync({ force: true });
    await Method.sync({ force: true });
    
    // 2. Crear tablas que dependen de las anteriores
    await Stock.sync({ force: true });
    await StockDetails.sync({ force: true });
    await Vehicle.sync({ force: true });
    await Service.sync({ force: true });
    await Transaction.sync({ force: true });
    
    console.log('All tables created manually');
}



