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
    
    // 3. Crear tablas intermedias (many-to-many) después de que existan las tablas padre
    await createJunctionTables();
    
    console.log('All tables created manually');
}

async function createJunctionTables() {
    // Crear tablas intermedias manualmente
    const db = (await import('./backend/db')).default;
    
    // Tabla users_roles
    await db.query(`
        CREATE TABLE IF NOT EXISTS users_roles (
            userId INTEGER NOT NULL,
            roleId INTEGER NOT NULL,
            created_at DATETIME NOT NULL,
            updated_at DATETIME NOT NULL,
            PRIMARY KEY (userId, roleId),
            FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
            FOREIGN KEY (roleId) REFERENCES roles(id) ON DELETE CASCADE ON UPDATE CASCADE
        ) ENGINE=InnoDB;
    `);
    
    // Tabla clients_vehicles
    await db.query(`
        CREATE TABLE IF NOT EXISTS clients_vehicles (
            clientId INTEGER NOT NULL,
            vehicleId INTEGER NOT NULL,
            created_at DATETIME NOT NULL,
            updated_at DATETIME NOT NULL,
            PRIMARY KEY (clientId, vehicleId),
            FOREIGN KEY (clientId) REFERENCES clients(id) ON DELETE CASCADE ON UPDATE CASCADE,
            FOREIGN KEY (vehicleId) REFERENCES vehicles(id) ON DELETE CASCADE ON UPDATE CASCADE
        ) ENGINE=InnoDB;
    `);
    
    // Tabla services_operators
    await db.query(`
        CREATE TABLE IF NOT EXISTS services_operators (
            serviceId INTEGER NOT NULL,
            operatorId INTEGER NOT NULL,
            created_at DATETIME NOT NULL,
            updated_at DATETIME NOT NULL,
            PRIMARY KEY (serviceId, operatorId),
            FOREIGN KEY (serviceId) REFERENCES services(id) ON DELETE CASCADE ON UPDATE CASCADE,
            FOREIGN KEY (operatorId) REFERENCES operators(id) ON DELETE CASCADE ON UPDATE CASCADE
        ) ENGINE=InnoDB;
    `);
    
    // Tabla services_stock_details_additional_products
    await db.query(`
        CREATE TABLE IF NOT EXISTS services_stock_details_additional_products (
            serviceId INTEGER NOT NULL,
            stockDetailId INTEGER NOT NULL,
            created_at DATETIME NOT NULL,
            updated_at DATETIME NOT NULL,
            PRIMARY KEY (serviceId, stockDetailId),
            FOREIGN KEY (serviceId) REFERENCES services(id) ON DELETE CASCADE ON UPDATE CASCADE,
            FOREIGN KEY (stockDetailId) REFERENCES stock_details(id) ON DELETE CASCADE ON UPDATE CASCADE
        ) ENGINE=InnoDB;
    `);
    
    // Tabla recipes_stock_details_products
    await db.query(`
        CREATE TABLE IF NOT EXISTS recipes_stock_details_products (
            recipeId INTEGER NOT NULL,
            stockDetailId INTEGER NOT NULL,
            created_at DATETIME NOT NULL,
            updated_at DATETIME NOT NULL,
            PRIMARY KEY (recipeId, stockDetailId),
            FOREIGN KEY (recipeId) REFERENCES recipes(id) ON DELETE CASCADE ON UPDATE CASCADE,
            FOREIGN KEY (stockDetailId) REFERENCES stock_details(id) ON DELETE CASCADE ON UPDATE CASCADE
        ) ENGINE=InnoDB;
    `);
    
    // Tabla transactions_methods
    await db.query(`
        CREATE TABLE IF NOT EXISTS transactions_methods (
            transactionId INTEGER NOT NULL,
            methodId INTEGER NOT NULL,
            created_at DATETIME NOT NULL,
            updated_at DATETIME NOT NULL,
            PRIMARY KEY (transactionId, methodId),
            FOREIGN KEY (transactionId) REFERENCES transactions(id) ON DELETE CASCADE ON UPDATE CASCADE,
            FOREIGN KEY (methodId) REFERENCES methods(id) ON DELETE CASCADE ON UPDATE CASCADE
        ) ENGINE=InnoDB;
    `);
    
    console.log('Junction tables created');
}



