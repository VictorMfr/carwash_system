// Create Roles

import Role from '../../models/auth/role';
import defaultRoles from '@/constants/backend/db/defaultRoles';

export default async function createRoles() {
    // List all existing roles
    const existingRoles = await Role.findAll();

    // Create roles that don't exist
    const rolesToCreate = defaultRoles.filter(role => (
        !existingRoles.some(existingRole => existingRole.get('name') === role.name)
    ));

    // Create roles
    await Role.bulkCreate(rolesToCreate);

    // Check if roles were created
    if (rolesToCreate.length > 0) {
        console.log('Roles created');
    } else {
        console.log('Roles already exist');
    }
}