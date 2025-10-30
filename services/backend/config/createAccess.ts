import { Role, User } from "../models/associations";
import bcrypt from "bcryptjs";
import { UserCreationAttributes } from "../models/auth/user";


type RoleName = typeof defaultRoles[number]['name']
type UserWithRoles = Omit<UserCreationAttributes, 'id' | 'created_at' | 'updated_at' | 'active'> & {
    roles: RoleName[]
}

const defaultRoles = [
    {
        name: 'Administrator'
    },
    {
        name: 'Stock Manager'
    },
    {
        name: 'Maintenance Manager'
    },
    {
        name: 'Finance Manager'
    }
] 

const defaultUsers: UserWithRoles[] = [
    {
        name: 'Admin',
        lastname: 'Admin',
        email: 'admin@admin.com',
        phone: '1234567890',
        address: '1234567890',
        password: 'admin',
        roles: ['Administrator']
    }
]

export default async function createAccess() {
    const roles = await Role.bulkCreate(defaultRoles);
    const admin = defaultUsers.find(user => user.email.includes('@admin.com'));

    if (!admin) {
        throw new Error('Admin user not found, must add one to defaultUsers.ts');
    }

    const adminData = { 
        ...admin, 
        password: await bcrypt.hash(admin.password, 10),
        roles: undefined 
    };

    const adminUser = await User.create(adminData);

    await roles[0].addUser(adminUser);
}