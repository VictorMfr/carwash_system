import { Sequelize } from 'sequelize';
import mysql2 from 'mysql2';

// Database connection
const db = new Sequelize(
    process.env.DB_NAME || 'mdd_db',
    process.env.DB_USER || 'root',
    process.env.DB_PASSWORD || 'toor',
    {
        host: process.env.DB_HOST || 'localhost',
        dialect: 'mysql',
        dialectModule: mysql2,
        port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
    }
);

export default db;