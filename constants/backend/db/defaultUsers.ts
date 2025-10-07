import { UserCreationAttributes } from "@/services/backend/models/auth/user";
import defaultRoles from "./defaultRoles";

type RoleName = typeof defaultRoles[number]['name']
type UserWithRoles = Omit<UserCreationAttributes, 'id' | 'created_at' | 'updated_at' | 'active'> & {
    roles: RoleName[]
}

const defaultUsers: UserWithRoles[] = [
    {
        name: 'Admin',
        lastname: 'Admin',
        email: 'admin@admin.com',
        phone: '1234567890',
        address: '1234567890',
        password: 'admin',
        roles: ['Super Admin']
    }
]

export default defaultUsers;