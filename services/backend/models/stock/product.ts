// Product model

import { 
    Model, 
    DataTypes, 
    InferAttributes, 
    InferCreationAttributes, 
    CreationOptional,
    NonAttribute,
    HasOneGetAssociationMixin,
    HasOneSetAssociationMixin,
    HasOneCreateAssociationMixin
} from 'sequelize';
import db from '../../db';
import Stock from './stock';

class Product extends Model<InferAttributes<Product>, InferCreationAttributes<Product>> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare unit: string;
    declare isTool: boolean;

    // Has one Stock
    declare stock: NonAttribute<Stock>;
    declare getStock: HasOneGetAssociationMixin<Stock>;
    declare setStock: HasOneSetAssociationMixin<Stock, number>;
    declare createStock: HasOneCreateAssociationMixin<Stock>;
}

export type ProductType = InferAttributes<Product>;
export type ProductCreationAttributes = InferCreationAttributes<Product>;
export type ProductAttributes = InferAttributes<Product>;

Product.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    unit: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isTool: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
}, {
    sequelize: db,
    modelName: 'Product',
    tableName: 'products',
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
});

export default Product;