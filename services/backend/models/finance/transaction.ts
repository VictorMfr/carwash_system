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
} from 'sequelize';
import db from '../../db';
import Account from './account';
import Method from './method';
import User from '../auth/user';

class Transaction extends Model<InferAttributes<Transaction>, InferCreationAttributes<Transaction>> {
    declare id: CreationOptional<number>;
    declare date: Date;
    declare amount: number;
    declare description: string;
    declare dollar_rate: number;

    // Belongs to Account
    declare Account: NonAttribute<Account>;
    declare getAccount: BelongsToGetAssociationMixin<Account>;
    declare setAccount: BelongsToSetAssociationMixin<Account, number>;
    declare createAccount: BelongsToCreateAssociationMixin<Account>;

    // Belongs to Method
    declare Method: NonAttribute<Method>;
    declare getMethod: BelongsToGetAssociationMixin<Method>;
    declare setMethod: BelongsToSetAssociationMixin<Method, number>;
    declare createMethod: BelongsToCreateAssociationMixin<Method>;

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
    dollar_rate: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize: db,
    modelName: 'Transaction',
    tableName: 'transactions',
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
});

export default Transaction;