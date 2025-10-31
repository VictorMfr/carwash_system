// Vehicle model

import { 
    Model as SequelizeModel, 
    DataTypes, 
    InferAttributes, 
    InferCreationAttributes, 
    CreationOptional, 
    NonAttribute,
    HasOneGetAssociationMixin,
    HasOneSetAssociationMixin,
    HasOneCreateAssociationMixin,
    BelongsToGetAssociationMixin,
    BelongsToSetAssociationMixin,
    BelongsToCreateAssociationMixin
} from 'sequelize';
import db from '../../../db';
import Service from '../service';
import VehicleBrand from './brand';
import Client from '../client';
import VehicleModel from './model';

class Vehicle extends SequelizeModel<InferAttributes<Vehicle>, InferCreationAttributes<Vehicle>> {
    declare id: CreationOptional<number>;
    declare license_plate: string;
    declare brandId: CreationOptional<number>;
    declare modelId: CreationOptional<number>;
    declare clientId: CreationOptional<number>;

    // Has one Service
    declare Service: NonAttribute<Service>;
    declare getService: HasOneGetAssociationMixin<Service>;
    declare setService: HasOneSetAssociationMixin<Service, number>;
    declare createService: HasOneCreateAssociationMixin<Service>;

    // Belongs to Model
    declare VehicleModel: NonAttribute<VehicleModel>;
    declare getVehicleModel: BelongsToGetAssociationMixin<VehicleModel>;
    declare setVehicleModel: BelongsToSetAssociationMixin<VehicleModel, number>;
    declare createVehicleModel: BelongsToCreateAssociationMixin<VehicleModel>;

    // Belongs to Brand
    declare VehicleBrand: NonAttribute<VehicleBrand>;
    declare getVehicleBrand: BelongsToGetAssociationMixin<VehicleBrand>;
    declare setVehicleBrand: BelongsToSetAssociationMixin<VehicleBrand, number>;
    declare createVehicleBrand: BelongsToCreateAssociationMixin<VehicleBrand>;

    // Belongs to Client (1:N)
    declare Client: NonAttribute<Client>;
    declare getClient: BelongsToGetAssociationMixin<Client>;
    declare setClient: BelongsToSetAssociationMixin<Client, number>;
    declare createClient: BelongsToCreateAssociationMixin<Client>;
}

export type VehicleCreationAttributes = InferCreationAttributes<Vehicle>;
export type VehicleAttributes = InferAttributes<Vehicle>;

Vehicle.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    license_plate: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    brandId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    modelId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    clientId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
}, {
    sequelize: db,
    modelName: 'Vehicle',
    tableName: 'vehicles',
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
});


export default Vehicle;