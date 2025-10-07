// Client model

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
import Vehicle from './vehicle/vehicle';

class Client extends Model<InferAttributes<Client>, InferCreationAttributes<Client>> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare lastname: string;
    declare phone: string;

    // Many-to-many relationship with Vehicle
    declare Vehicles: NonAttribute<Vehicle[]>;
    declare getVehicles: BelongsToManyGetAssociationsMixin<Vehicle>;
    declare countVehicles: BelongsToManyCountAssociationsMixin;
    declare hasVehicle: BelongsToManyHasAssociationMixin<Vehicle, number>;
    declare hasVehicles: BelongsToManyHasAssociationMixin<Vehicle, number>;
    declare setVehicles: BelongsToManySetAssociationsMixin<Vehicle, number>;
    declare addVehicle: BelongsToManyAddAssociationMixin<Vehicle, number>;
    declare addVehicles: BelongsToManyAddAssociationMixin<Vehicle, number>;
    declare removeVehicle: BelongsToManyRemoveAssociationMixin<Vehicle, number>;
    declare removeVehicles: BelongsToManyRemoveAssociationsMixin<Vehicle, number>;
    declare createVehicle: BelongsToManyCreateAssociationMixin<Vehicle>;
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
    tableName: 'clients',
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
});

export default Client;