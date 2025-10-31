// Model model
import { 
    Model as SequelizeModel, 
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

class VehicleModel extends SequelizeModel<InferAttributes<VehicleModel>, InferCreationAttributes<VehicleModel>> {
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

export type VehicleModelCreationAttributes = InferCreationAttributes<VehicleModel>;
export type VehicleModelAttributes = InferAttributes<VehicleModel>;

VehicleModel.init({
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
    modelName: 'VehicleModel',
    tableName: 'vehicle_models',
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
});

export default VehicleModel;