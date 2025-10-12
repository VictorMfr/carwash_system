// Associations
import User from './auth/user';
import Role from './auth/role';
import Stock from './stock/stock';
import Product from './stock/product';
import StockDetails from './stock/stockDetails';
import StockBrand from './stock/brand';
import State from './stock/state';
import Recipe from './service/recipe';
import RecipeProduct from './service/recipeProduct';
import Service from './service/service';
import Operator from './service/operator';
import Vehicle from './service/vehicle/vehicle';
import VehicleBrand from './service/vehicle/brand';
import Model from './service/vehicle/model';
import Client from './service/client';
import Account from './finance/account';
import Transaction from './finance/transaction';
import Type from './finance/type';
import Method from './finance/method';

// services/backend/models/associations.ts
User.belongsToMany(Role, {
    through: 'user_roles',
    as: 'Roles',
    foreignKey: 'userId',       // <-- fija las columnas de la pivote
    otherKey: 'roleId',
});
Role.belongsToMany(User, {
    through: 'user_roles',
    as: 'Users',
    foreignKey: 'roleId',
    otherKey: 'userId',
});

User.hasOne(Stock);
Stock.belongsTo(User);

Product.hasOne(Stock);
Stock.belongsTo(Product);

StockBrand.hasMany(StockDetails);
StockDetails.belongsTo(StockBrand);

State.hasMany(StockDetails);
StockDetails.belongsTo(State);

Stock.hasMany(StockDetails);
StockDetails.belongsTo(Stock);

// Service module
Recipe.hasMany(Service);
Service.belongsTo(Recipe);

Recipe.belongsToMany(StockDetails, { 
    through: 'recipes_stock_details_products', 
    as: 'RecipeStockDetails',
    foreignKey: 'recipeId',
    otherKey: 'stockDetailId'
});
StockDetails.belongsToMany(Recipe, { 
    through: 'recipes_stock_details_products', 
    as: 'Recipes',
    foreignKey: 'stockDetailId',
    otherKey: 'recipeId'
});

Service.belongsToMany(StockDetails, { 
    through: 'services_stock_details_additional_products', 
    as: 'ServiceStockDetails',
    foreignKey: 'serviceId',
    otherKey: 'stockDetailId'
});
StockDetails.belongsToMany(Service, { 
    through: 'services_stock_details_additional_products', 
    as: 'Services',
    foreignKey: 'stockDetailId',
    otherKey: 'serviceId'
});

Service.belongsToMany(Operator, { 
    through: 'services_operators', 
    as: 'Operators',
    foreignKey: 'serviceId',
    otherKey: 'operatorId'
});
Operator.belongsToMany(Service, { 
    through: 'services_operators', 
    as: 'Services',
    foreignKey: 'operatorId',
    otherKey: 'serviceId'
});

Vehicle.hasOne(Service);
Service.belongsTo(Vehicle);

Model.hasMany(Vehicle, { as: 'Vehicles', foreignKey: 'modelId' });
Vehicle.belongsTo(Model, { as: 'Model', foreignKey: 'modelId' });

VehicleBrand.hasMany(Vehicle, { as: 'Vehicles', foreignKey: 'brandId' });
Vehicle.belongsTo(VehicleBrand, { as: 'Brand', foreignKey: 'brandId' });

Client.hasMany(Vehicle, { as: 'Vehicles', foreignKey: 'clientId' });
Vehicle.belongsTo(Client, { as: 'Client', foreignKey: 'clientId' });

// Finance module
User.hasMany(Transaction);
Transaction.belongsTo(User);

Account.hasMany(Transaction, { as: 'Transactions' });
Transaction.belongsTo(Account);

Type.hasMany(Transaction);
Transaction.belongsTo(Type);

Method.hasMany(Transaction);
Transaction.belongsToMany(Method, { 
    through: 'transactions_methods', 
    as: 'Methods',
    foreignKey: 'transactionId',
    otherKey: 'methodId'
});
Method.belongsToMany(Transaction, { 
    through: 'transactions_methods', 
    as: 'MethodTransactions',
    foreignKey: 'methodId',
    otherKey: 'transactionId'
});

// Recipe <-> Product (many-to-many) via recipes_products
Recipe.belongsToMany(Product, { 
    through: RecipeProduct,
    as: 'Products',
    foreignKey: 'recipeId',
    otherKey: 'productId'
});
Product.belongsToMany(Recipe, { 
    through: RecipeProduct,
    as: 'ProductRecipes',
    foreignKey: 'productId',
    otherKey: 'recipeId'
});

export {
    User,
    Role,
    Stock,
    Product,
    StockDetails,
    StockBrand as Brand,
    State,
    Recipe,
    Service,
    Vehicle,
    Operator,
    VehicleBrand,
    Model as VehicleModel,
    Account,
    Method,
    Type,
    Client,
    Transaction
};