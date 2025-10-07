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
        logging: false, // Suprime los warnings de MySQL 5.5
        dialectOptions: {
            charset: 'utf8mb4',
            collate: 'utf8mb4_unicode_ci',
            // Configuraciones específicas para MySQL 5.5
            supportBigNumbers: true,
            bigNumberStrings: true
        },
        define: {
            // Configuraciones globales para todos los modelos
            timestamps: true,
            paranoid: true,
            underscored: true,
            freezeTableName: true
        },
        sync: {
            // Configuraciones para la sincronización
            force: false,
            alter: false
        }
    }
);

export default db;