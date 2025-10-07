// Service model
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
import Recipe from './recipe';
import Operator from './operator';
import Vehicle from './vehicle/vehicle';
import StockDetails from '../stock/stockDetails';

class Service extends Model<InferAttributes<Service>, InferCreationAttributes<Service>> {
    declare id: CreationOptional<number>;
    declare date: Date;

    // Belongs to Recipe
    declare Recipe: NonAttribute<Recipe>;
    declare getRecipe: BelongsToGetAssociationMixin<Recipe>;
    declare setRecipe: BelongsToSetAssociationMixin<Recipe, number>;
    declare createRecipe: BelongsToCreateAssociationMixin<Recipe>;

    // Many-to-many relationship with Operator
    declare Operators: NonAttribute<Operator[]>;
    declare getOperators: BelongsToManyGetAssociationsMixin<Operator>;
    declare countOperators: BelongsToManyCountAssociationsMixin;
    declare hasOperator: BelongsToManyHasAssociationMixin<Operator, number>;
    declare hasOperators: BelongsToManyHasAssociationMixin<Operator, number>;
    declare setOperators: BelongsToManySetAssociationsMixin<Operator, number>;
    declare addOperator: BelongsToManyAddAssociationMixin<Operator, number>;
    declare addOperators: BelongsToManyAddAssociationMixin<Operator, number>;
    declare removeOperator: BelongsToManyRemoveAssociationMixin<Operator, number>;
    declare removeOperators: BelongsToManyRemoveAssociationsMixin<Operator, number>;
    declare createOperator: BelongsToManyCreateAssociationMixin<Operator>;

    // Belongs to Vehicle
    declare Vehicle: NonAttribute<Vehicle>;
    declare getVehicle: BelongsToGetAssociationMixin<Vehicle>;
    declare setVehicle: BelongsToSetAssociationMixin<Vehicle, number>;
    declare createVehicle: BelongsToCreateAssociationMixin<Vehicle>;

    // Many-to-many relationship with StockDetails
    declare StockDetails: NonAttribute<StockDetails[]>;
    declare getStockDetails: BelongsToManyGetAssociationsMixin<StockDetails>;
    declare countStockDetails: BelongsToManyCountAssociationsMixin;
    declare hasStockDetails: BelongsToManyHasAssociationMixin<StockDetails, number>;
    declare setStockDetails: BelongsToManySetAssociationsMixin<StockDetails, number>;
    declare addStockDetail: BelongsToManyAddAssociationMixin<StockDetails, number>;
    declare addStockDetails: BelongsToManyAddAssociationMixin<StockDetails, number>;
    declare removeStockDetail: BelongsToManyRemoveAssociationMixin<StockDetails, number>;
    declare removeStockDetails: BelongsToManyRemoveAssociationsMixin<StockDetails, number>;
    declare createStockDetail: BelongsToManyCreateAssociationMixin<StockDetails>;
}

export type ServiceCreationAttributes = InferCreationAttributes<Service>;
export type ServiceAttributes = InferAttributes<Service>;

Service.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    sequelize: db,
    tableName: 'services',
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
});

export default Service;