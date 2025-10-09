import { 
    CreationOptional, 
    DataTypes, 
    InferAttributes, 
    InferCreationAttributes, 
    NonAttribute, 
    Model,
    BelongsToManyGetAssociationsMixin,
    BelongsToManyAddAssociationMixin,
    BelongsToManyHasAssociationMixin,
    BelongsToManyCountAssociationsMixin,
    BelongsToManyCreateAssociationMixin,
    BelongsToManySetAssociationsMixin,
    BelongsToManyRemoveAssociationMixin,
    BelongsToManyRemoveAssociationsMixin,
    HasOneGetAssociationMixin,
    HasOneSetAssociationMixin,
    HasOneCreateAssociationMixin,
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
import Role from './role';
import Stock from '../stock/stock';
import Transaction from '../finance/transaction';

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare lastname: string;
    declare phone: string;
    declare address: string;
    declare email: string;
    declare password: string;
    declare active: CreationOptional<boolean>;
    declare created_at: CreationOptional<Date>;
    declare updated_at: CreationOptional<Date>;

    // Many-to-many relationship with Role
    declare Roles: NonAttribute<Role[]>;
    declare getRoles: BelongsToManyGetAssociationsMixin<Role>;
    declare countRoles: BelongsToManyCountAssociationsMixin;
    declare hasRole: BelongsToManyHasAssociationMixin<Role, number>;
    declare hasRoles: BelongsToManyHasAssociationMixin<Role, number>;
    declare setRoles: BelongsToManySetAssociationsMixin<Role, number>;
    declare addRole: BelongsToManyAddAssociationMixin<Role, number>;
    declare addRoles: BelongsToManyAddAssociationMixin<Role, number>;
    declare removeRole: BelongsToManyRemoveAssociationMixin<Role, number>;
    declare removeRoles: BelongsToManyRemoveAssociationsMixin<Role, number>;
    declare createRole: BelongsToManyCreateAssociationMixin<Role>;

    // One-to-one relationship with Stock
    declare Stock: NonAttribute<Stock>;
    declare getStock: HasOneGetAssociationMixin<Stock>;
    declare setStock: HasOneSetAssociationMixin<Stock, number>;
    declare createStock: HasOneCreateAssociationMixin<Stock>;

    // One-to-many relationship with Transaction
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

export type UserCreationAttributes = InferCreationAttributes<User>;
export type UserAttributes = InferAttributes<User>;

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}, {
    sequelize: db,
    tableName: 'users',
    modelName: 'User',
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
});

export default User;
