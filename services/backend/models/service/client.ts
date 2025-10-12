// Client model

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
import Vehicle from './vehicle/vehicle';

class Client extends Model<InferAttributes<Client>, InferCreationAttributes<Client>> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare lastname: string;
    declare phone: string;

    // Has many Vehicles (1:N)
    declare Vehicles: NonAttribute<Vehicle[]>;
    declare getVehicles: HasManyGetAssociationsMixin<Vehicle>;
    declare countVehicles: HasManyCountAssociationsMixin;
    declare hasVehicle: HasManyHasAssociationMixin<Vehicle, number>;
    declare hasVehicles: HasManyHasAssociationMixin<Vehicle, number>;
    declare setVehicles: HasManySetAssociationsMixin<Vehicle, number>;
    declare addVehicle: HasManyAddAssociationMixin<Vehicle, number>;
    declare addVehicles: HasManyAddAssociationMixin<Vehicle, number>;
    declare removeVehicle: HasManyRemoveAssociationMixin<Vehicle, number>;
    declare removeVehicles: HasManyRemoveAssociationsMixin<Vehicle, number>;
    declare createVehicle: HasManyCreateAssociationMixin<Vehicle>;
}

export type ClientCreationAttributes = InferCreationAttributes<Client>;
export type ClientAttributes = InferAttributes<Client>;

Client.init({
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
}, {
    sequelize: db,
    modelName: 'Client',
    tableName: 'clients',
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
});

export default Client;