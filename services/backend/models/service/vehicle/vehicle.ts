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
    BelongsToCreateAssociationMixin,
    BelongsToManyGetAssociationsMixin,
    BelongsToManyAddAssociationMixin,
    BelongsToManyHasAssociationMixin,
    BelongsToManyCountAssociationsMixin,
    BelongsToManyCreateAssociationMixin,
    BelongsToManySetAssociationsMixin,
    BelongsToManyRemoveAssociationMixin,
    BelongsToManyRemoveAssociationsMixin
} from 'sequelize';
import db from '../../../db';
import Service from '../service';
import Brand from './brand';
import Client from '../client';
import Model from './model';

class Vehicle extends SequelizeModel<InferAttributes<Vehicle>, InferCreationAttributes<Vehicle>> {
    declare id: CreationOptional<number>;
    declare license_plate: string;
    declare brandId: CreationOptional<number>;
    declare modelId: CreationOptional<number>;

    // Has one Service
    declare Service: NonAttribute<Service>;
    declare getService: HasOneGetAssociationMixin<Service>;
    declare setService: HasOneSetAssociationMixin<Service, number>;
    declare createService: HasOneCreateAssociationMixin<Service>;

    // Belongs to Model
    declare Model: NonAttribute<Model>;
    declare getModel: BelongsToGetAssociationMixin<Model>;
    declare setModel: BelongsToSetAssociationMixin<Model, number>;
    declare createModel: BelongsToCreateAssociationMixin<Model>;

    // Belongs to Brand
    declare Brand: NonAttribute<Brand>;
    declare getBrand: BelongsToGetAssociationMixin<Brand>;
    declare setBrand: BelongsToSetAssociationMixin<Brand, number>;
    declare createBrand: BelongsToCreateAssociationMixin<Brand>;

    // Many-to-many relationship with Client
    declare Clients: NonAttribute<Client[]>;
    declare getClients: BelongsToManyGetAssociationsMixin<Client>;
    declare countClients: BelongsToManyCountAssociationsMixin;
    declare hasClient: BelongsToManyHasAssociationMixin<Client, number>;
    declare hasClients: BelongsToManyHasAssociationMixin<Client, number>;
    declare setClients: BelongsToManySetAssociationsMixin<Client, number>;
    declare addClient: BelongsToManyAddAssociationMixin<Client, number>;
    declare addClients: BelongsToManyAddAssociationMixin<Client, number>;
    declare removeClient: BelongsToManyRemoveAssociationMixin<Client, number>;
    declare removeClients: BelongsToManyRemoveAssociationsMixin<Client, number>;
    declare createClient: BelongsToManyCreateAssociationMixin<Client>;
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