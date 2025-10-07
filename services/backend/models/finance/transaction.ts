// Transaction model
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
    BelongsToManyCreateAssociationMixin,
    BelongsToManyAddAssociationMixin,
    BelongsToManyRemoveAssociationsMixin,
    BelongsToManyRemoveAssociationMixin,
    BelongsToManyHasAssociationMixin,
    BelongsToManySetAssociationsMixin,
    BelongsToManyCountAssociationsMixin,
    BelongsToManyGetAssociationsMixin
} from 'sequelize';
import db from '../../db';
import Account from './account';
import Type from './type';
import Method from './method';
import User from '../auth/user';

class Transaction extends Model<InferAttributes<Transaction>, InferCreationAttributes<Transaction>> {
    declare id: CreationOptional<number>;
    declare date: Date;
    declare amount: number;
    declare description: string;
    declare dolar_rate: number;
    declare name: string;

    // Belongs to Account
    declare Account: NonAttribute<Account>;
    declare getAccount: BelongsToGetAssociationMixin<Account>;
    declare setAccount: BelongsToSetAssociationMixin<Account, number>;
    declare createAccount: BelongsToCreateAssociationMixin<Account>;

    // Belongs to Type
    declare Type: NonAttribute<Type>;
    declare getType: BelongsToGetAssociationMixin<Type>;
    declare setType: BelongsToSetAssociationMixin<Type, number>;
    declare createType: BelongsToCreateAssociationMixin<Type>;

    // Belongs to many Method
    declare Methods: NonAttribute<Method[]>;
    declare getMethods: BelongsToManyGetAssociationsMixin<Method>;
    declare countMethods: BelongsToManyCountAssociationsMixin;
    declare hasMethod: BelongsToManyHasAssociationMixin<Method, number>;
    declare hasMethods: BelongsToManyHasAssociationMixin<Method, number>;
    declare setMethods: BelongsToManySetAssociationsMixin<Method, number>;
    declare addMethod: BelongsToManyAddAssociationMixin<Method, number>;
    declare addMethods: BelongsToManyAddAssociationMixin<Method, number>;
    declare removeMethod: BelongsToManyRemoveAssociationMixin<Method, number>;
    declare removeMethods: BelongsToManyRemoveAssociationsMixin<Method, number>;
    declare createMethod: BelongsToManyCreateAssociationMixin<Method>;

    // Belongs to User
    declare User: NonAttribute<User>;
    declare getUser: BelongsToGetAssociationMixin<User>;
    declare setUser: BelongsToSetAssociationMixin<User, number>;
    declare createUser: BelongsToCreateAssociationMixin<User>;
}

export type TransactionCreationAttributes = InferCreationAttributes<Transaction>;
export type TransactionAttributes = InferAttributes<Transaction>;

Transaction.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dolar_rate: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: db,
    tableName: 'transactions',
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
});

export default Transaction;