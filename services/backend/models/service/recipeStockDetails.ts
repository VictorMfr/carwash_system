// Recipe model

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
} from 'sequelize';
import db from '../../db';
import StockDetails from '../stock/stockDetails';
import Recipe from './recipe';

class RecipeStockDetails extends Model<InferAttributes<RecipeStockDetails>, InferCreationAttributes<RecipeStockDetails>> {
    declare id: CreationOptional<number>;
    declare quantity: number;
    declare recipeId: CreationOptional<number>;
    declare stockDetailId: CreationOptional<number>;

    // Belongs to Recipe
    declare Recipe: NonAttribute<Recipe>;
    declare getRecipe: BelongsToGetAssociationMixin<Recipe>;
    declare setRecipe: BelongsToSetAssociationMixin<Recipe, number>;
    declare createRecipe: BelongsToCreateAssociationMixin<Recipe>;

    // Belongs to StockDetails
    declare StockDetails: NonAttribute<StockDetails>;
    declare getStockDetails: BelongsToGetAssociationMixin<StockDetails>;
    declare setStockDetails: BelongsToSetAssociationMixin<StockDetails, number>;
    declare createStockDetails: BelongsToCreateAssociationMixin<StockDetails>;
}

export type RecipeStockDetailsCreationAttributes = InferCreationAttributes<RecipeStockDetails>;
export type RecipeStockDetailsAttributes = InferAttributes<RecipeStockDetails>;

RecipeStockDetails.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    recipeId: {
        type: DataTypes.INTEGER,
        references: {
            model: Recipe,
            key: 'id',
        },
        allowNull: false,
    },
    stockDetailId: {
        type: DataTypes.INTEGER,
        references: {
            model: StockDetails,
            key: 'id',
        },
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize: db,
    modelName: 'RecipeStockDetails',
    tableName: 'recipe_stock_details',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
});

export default RecipeStockDetails;