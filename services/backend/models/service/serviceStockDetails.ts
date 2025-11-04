// Service Stock Details model

import { 
    Model, 
    DataTypes, 
    InferAttributes, 
    InferCreationAttributes, 
    CreationOptional
} from 'sequelize';
import db from '../../db';
import Service from './service';
import StockDetails from '../stock/stockDetails';

class ServiceStockDetails extends Model<InferAttributes<ServiceStockDetails>, InferCreationAttributes<ServiceStockDetails>> {
    declare id: CreationOptional<number>;
    declare quantity: number;
    declare serviceId: CreationOptional<number>;
    declare stockDetailId: CreationOptional<number>;
}

export type ServiceStockDetailsCreationAttributes = InferCreationAttributes<ServiceStockDetails>;
export type ServiceStockDetailsAttributes = InferAttributes<ServiceStockDetails>;

ServiceStockDetails.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    serviceId: {
        type: DataTypes.INTEGER,
        references: {
            model: Service,
            key: 'id',
        },
        allowNull: false,
    },
    stockDetailId: {
        type: DataTypes.INTEGER,
        references: {
            model: StockDetails,
            key: 'id',
        },
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize: db,
    modelName: 'ServiceStockDetails',
    tableName: 'service_stock_details',
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
});

export default ServiceStockDetails;