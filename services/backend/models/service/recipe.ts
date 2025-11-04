// Recipe model

import { 
    Model, 
    DataTypes, 
    InferAttributes, 
    InferCreationAttributes, 
    CreationOptional, 
    NonAttribute,
    BelongsToManyAddAssociationMixin,
    BelongsToManyGetAssociationsMixin,
    BelongsToManyCountAssociationsMixin,
    BelongsToManyHasAssociationMixin,
    BelongsToManySetAssociationsMixin,
    BelongsToManyRemoveAssociationMixin,
    BelongsToManyRemoveAssociationsMixin,
    BelongsToManyCreateAssociationMixin
} from 'sequelize';
import db from '../../db';
import StockDetails from '../stock/stockDetails';

class Recipe extends Model<InferAttributes<Recipe>, InferCreationAttributes<Recipe>> {
    declare id: CreationOptional<number>;
    declare name: string;

    // Belongs to many StockDetails
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