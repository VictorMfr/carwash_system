// Brand model

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
import db from '../../../db';
import Vehicle from './vehicle';

class Brand extends Model<InferAttributes<Brand>, InferCreationAttributes<Brand>> {
    declare id: CreationOptional<number>;
    declare name: string;

    // Has many Vehicles
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

export type BrandCreationAttributes = InferCreationAttributes<Brand>;
export type BrandAttributes = InferAttributes<Brand>;

Brand.init({
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
    modelName: 'VehicleBrand',
    tableName: 'brands',
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
});

export default Brand;