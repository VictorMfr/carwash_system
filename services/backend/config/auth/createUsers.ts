import { Role, User } from "../../models/associations";
import defaultRoles from "@/constants/backend/db/defaultRoles";

export default async function createUsers() {

    const admin = await User.create({
        name: 'Admin',
        lastname: 'Admin',
        email: 'admin@admin.com',
        phone: '1234567890',
        address: '1234567890',
        password: 'admin',
        active: true
    });

    await admin.createRole({
        name: 'Administrator',
    });
}