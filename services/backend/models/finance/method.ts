// Method model

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
import Transaction from './transaction';

class Method extends Model<InferAttributes<Method>, InferCreationAttributes<Method>> {
    declare id: CreationOptional<number>;
    declare name: string;

    // Has many Transactions
    declare Transactions: NonAttribute<Transaction[]>;
    declare getTransactions: HasManyGetAssociationsMixin<Transaction>;
    declare countTransactions: HasManyCountAssociationsMixin;
    declare hasTransaction: HasManyHasAssociationMixin<Transaction, number>;
    declare hasTransactions: HasManyHasAssociationMixin<Transaction, number>;
    declare setTransactions: HasManySetAssociationsMixin<Transaction, number>;
    declare addTransaction: HasManyAddAssociationMixin<Transaction, number>;
    declare addTransactions: HasManyAddAssociationMixin<Transaction, number>;
    declare removeTransaction: HasManyRemoveAssociationMixin<Transaction, number>;
    declare removeTransactions: HasManyRemoveAssociationsMixin<Transaction, number>;
    declare createTransaction: HasManyCreateAssociationMixin<Transaction>;
}

export type MethodCreationAttributes = InferCreationAttributes<Method>;
export type MethodAttributes = InferAttributes<Method>;

Method.init({
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
    tableName: 'methods',
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
});

export default Method;