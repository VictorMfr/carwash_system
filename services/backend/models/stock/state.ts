// State model

import { 
    Model, 
    DataTypes, 
    InferAttributes, 
    InferCreationAttributes, 
    CreationOptional, 
    NonAttribute,
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
import StockDetails from './stockDetails';

class State extends Model<InferAttributes<State>, InferCreationAttributes<State>> {
    declare id: CreationOptional<number>;
    declare name: string;

    // Has many StockDetails
    declare stockDetails: NonAttribute<StockDetails[]>;
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

export type StateCreationAttributes = InferCreationAttributes<State>;
export type StateAttributes = InferAttributes<State>;

State.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: db,
    modelName: 'State',
    tableName: 'states',
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
});

export default State;