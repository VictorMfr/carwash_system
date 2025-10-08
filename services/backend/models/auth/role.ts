// Role model

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
import User from './user';

class Role extends Model<InferAttributes<Role>, InferCreationAttributes<Role>> {
    declare id: CreationOptional<number>;
    declare name: string;

    // Many-to-many relationship with User
    declare Users: NonAttribute<User[]>;
    declare getUsers: BelongsToManyGetAssociationsMixin<User>;
    declare countUsers: BelongsToManyCountAssociationsMixin;
    declare hasUser: BelongsToManyHasAssociationMixin<User, number>;
    declare hasUsers: BelongsToManyHasAssociationMixin<User, number>;
    declare setUsers: BelongsToManySetAssociationsMixin<User, number>;
    declare addUser: BelongsToManyAddAssociationMixin<User, number>;
    declare addUsers: BelongsToManyAddAssociationMixin<User, number>;
    declare removeUser: BelongsToManyRemoveAssociationMixin<User, number>;
    declare removeUsers: BelongsToManyRemoveAssociationsMixin<User, number>;
    declare createUser: BelongsToManyCreateAssociationMixin<User>;
}

Role.init({
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
    tableName: 'roles',
    modelName: 'Role',
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
});

export default Role;