import defaultRoles from "@/constants/backend/db/defaultRoles";
import { Role, User } from "../../models/associations";
import defaultUsers from "@/constants/backend/db/defaultUsers";

export default async function createAccess() {
    const roles = await Role.bulkCreate(defaultRoles);
    const admin = defaultUsers.find(user => user.email.includes('@admin.com'));

    if (!admin) {
        throw new Error('Admin user not found, must add one to defaultUsers.ts');
    }

    const adminData = { ...admin, roles: undefined };
    const adminUser = await User.create(adminData);

    await roles[0].addUser(adminUser);
}