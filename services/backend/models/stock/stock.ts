// Stock model

import { 
    Model, 
    DataTypes, 
    InferAttributes, 
    InferCreationAttributes, 
    CreationOptional, 
    NonAttribute,
    BelongsToGetAssociationMixin,
    BelongsToSetAssociationMixin,
    BelongsToCreateAssociationMixin,
    HasManyGetAssociationsMixin,
    HasManyAddAssociationMixin,
    HasManyHasAssociationMixin,
    HasManyCountAssociationsMixin,
    HasManyCreateAssociationMixin,
    HasManySetAssociationsMixin,
    HasManyRemoveAssociationMixin,
    HasManyRemoveAssociationsMixin
} from 'sequelize';
import db from '../../db';
import Product from './product';
import StockDetails from './stockDetails';
import User from '../auth/user';

class Stock extends Model<InferAttributes<Stock>, InferCreationAttributes<Stock>> {
    declare id: CreationOptional<number>;
    declare total_quantity: number;
    declare minimum_quantity: number;

    // Belongs to Product
    declare Product: NonAttribute<Product>;
    declare getProduct: BelongsToGetAssociationMixin<Product>;
    declare setProduct: BelongsToSetAssociationMixin<Product, number>;
    declare createProduct: BelongsToCreateAssociationMixin<Product>;

    // Belongs to User
    declare User: NonAttribute<User>;
    declare getUser: BelongsToGetAssociationMixin<User>;
    declare setUser: BelongsToSetAssociationMixin<User, number>;
    declare createUser: BelongsToCreateAssociationMixin<User>;

    // Has many StockDetails
    declare StockDetails: NonAttribute<StockDetails[]>;
    declare getStockDetails: HasManyGetAssociationsMixin<StockDetails>;
    declare countStockDetails: HasManyCountAssociationsMixin;
    declare hasStockDetails: HasManyHasAssociationMixin<StockDetails, number>;
    declare setStockDetails: HasManySetAssociationsMixin<StockDetails, number>;
    declare addStockDetail: HasManyAddAssociationMixin<StockDetails, number>;
    declare addStockDetails: HasManyAddAssociationMixin<StockDetails, number>;
    declare removeStockDetail: HasManyRemoveAssociationMixin<StockDetails, number>;
    declare removeStockDetails: HasManyRemoveAssociationsMixin<StockDetails, number>;
    declare createStockDetail: HasManyCreateAssociationMixin<StockDetails>;
}

export type StockCreationAttributes = InferCreationAttributes<Stock>;
export type StockAttributes = InferAttributes<Stock>;

Stock.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    total_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    minimum_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    sequelize: db,
    tableName: 'stocks',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
});

export default Stock;