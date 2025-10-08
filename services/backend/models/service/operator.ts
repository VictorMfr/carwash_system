// Operator model

import { 
    Model, 
    DataTypes, 
    InferAttributes, 
    InferCreationAttributes, 
    CreationOptional, 
    NonAttribute,
    BelongsToManyGetAssociationsMixin,
    BelongsToManyAddAssociationMixin,
    BelongsToManyHasAssociationMixin,
    BelongsToManyCountAssociationsMixin,
    BelongsToManyCreateAssociationMixin,
    BelongsToManySetAssociationsMixin,
    BelongsToManyRemoveAssociationMixin,
    BelongsToManyRemoveAssociationsMixin
} from 'sequelize';
import db from '../../db';
import Service from './service';

class Operator extends Model<InferAttributes<Operator>, InferCreationAttributes<Operator>> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare lastname: string;
    declare phone: string;
    declare address: string;
    declare avatar: string | null;

    // Many-to-many relationship with Service
    declare Services: NonAttribute<Service[]>;
    declare getServices: BelongsToManyGetAssociationsMixin<Service>;
    declare countServices: BelongsToManyCountAssociationsMixin;
    declare hasService: BelongsToManyHasAssociationMixin<Service, number>;
    declare hasServices: BelongsToManyHasAssociationMixin<Service, number>;
    declare setServices: BelongsToManySetAssociationsMixin<Service, number>;
    declare addService: BelongsToManyAddAssociationMixin<Service, number>;
    declare addServices: BelongsToManyAddAssociationMixin<Service, number>;
    declare removeService: BelongsToManyRemoveAssociationMixin<Service, number>;
    declare removeServices: BelongsToManyRemoveAssociationsMixin<Service, number>;
    declare createService: BelongsToManyCreateAssociationMixin<Service>;
}

export type OperatorCreationAttributes = InferCreationAttributes<Operator>;
export type OperatorAttributes = InferAttributes<Operator>;

Operator.init({
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
    avatar: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    sequelize: db,
    modelName: 'Operator',
    tableName: 'operators',
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
});

export default Operator;