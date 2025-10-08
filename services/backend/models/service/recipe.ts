// Recipe model

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
import Service from './service';

class Recipe extends Model<InferAttributes<Recipe>, InferCreationAttributes<Recipe>> {
    declare id: CreationOptional<number>;
    declare name: string;

    // Has many Services
    declare Services: NonAttribute<Service[]>;
    declare getServices: HasManyGetAssociationsMixin<Service>;
    declare countServices: HasManyCountAssociationsMixin;
    declare hasService: HasManyHasAssociationMixin<Service, number>;
    declare hasServices: HasManyHasAssociationMixin<Service, number>;
    declare setServices: HasManySetAssociationsMixin<Service, number>;
    declare addService: HasManyAddAssociationMixin<Service, number>;
    declare addServices: HasManyAddAssociationMixin<Service, number>;
    declare removeService: HasManyRemoveAssociationMixin<Service, number>;
    declare removeServices: HasManyRemoveAssociationsMixin<Service, number>;
    declare createService: HasManyCreateAssociationMixin<Service>;
}

export type RecipeCreationAttributes = InferCreationAttributes<Recipe>;
export type RecipeAttributes = InferAttributes<Recipe>;

Recipe.init({
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
    modelName: 'Recipe',
    tableName: 'recipes',
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
});

export default Recipe;