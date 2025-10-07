// Create Super Admin
import defaultUsers from '@/constants/backend/db/defaultUsers';
import bcrypt from 'bcryptjs';
import { User } from '../../models/associations';

export default async function createUsers() {
    // List all existing users
    const existingUsers = await User.findAll();
    const test = await User.findByPk(1);

    // Create users that don't exist
    const usersToCreate = defaultUsers.filter(user => (
        !existingUsers.some(existingUser => (
            existingUser.get('email') === user.email)
        )
    ));

    // Hash their passwords
    const hashedUsers = await Promise.all(usersToCreate.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 10)
    })));

    // Create users
    await User.bulkCreate(hashedUsers);

    // Check if users were created
    if (usersToCreate.length > 0) {
        console.log('Users created');
    } else {
        console.log('Users already exist');
    }
}