import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import db from '../../db';

class RecipeProduct extends Model<InferAttributes<RecipeProduct>, InferCreationAttributes<RecipeProduct>> {
    declare id: CreationOptional<number>;
    declare recipeId: number;
    declare productId: number;
    declare quantity: number;
}

RecipeProduct.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    recipeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    }
}, {
    sequelize: db,
    modelName: 'RecipeProduct',
    tableName: 'recipes_products',
    timestamps: true,
    paranoid: false,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

export default RecipeProduct;


