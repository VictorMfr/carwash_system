// Associations
import User from './auth/user';
import Role from './auth/role';
import Stock from './stock/stock';
import Product from './stock/product';
import StockDetails from './stock/stockDetails';
import StockBrand from './stock/brand';
import State from './stock/state';
import Recipe from './service/recipe';
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

User.belongsToMany(Role, { through: 'users_roles' });
Role.belongsToMany(User, { through: 'users_roles' });

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

Recipe.belongsToMany(StockDetails, { through: 'recipes_stock_details_products' });

Service.belongsToMany(StockDetails, { through: 'services_stock_details_additional_products' });
StockDetails.belongsToMany(Service, { through: 'services_stock_details_additional_products' });

Service.belongsToMany(Operator, { through: 'services_operators' });
Operator.belongsToMany(Service, { through: 'services_operators' });

Vehicle.hasOne(Service);
Service.belongsTo(Vehicle);

Model.hasMany(Vehicle);
Vehicle.belongsTo(Model);

VehicleBrand.hasMany(Vehicle);
Vehicle.belongsTo(VehicleBrand);

Client.belongsToMany(Vehicle, { through: 'clients_vehicles' });
Vehicle.belongsToMany(Client, { through: 'clients_vehicles' });

// Finance module
User.hasMany(Transaction);
Transaction.belongsTo(User);

Account.hasMany(Transaction);
Transaction.belongsTo(Account);

Type.hasMany(Transaction);
Transaction.belongsTo(Type);

Method.hasMany(Transaction);
Transaction.belongsToMany(Method, { through: 'transactions_methods' });

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