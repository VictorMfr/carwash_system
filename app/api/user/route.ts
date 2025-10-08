import { Role, User } from "@/services/backend/models/associations";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { Op } from "sequelize";

// Create user
export async function POST(request: Request) {
    try {
        const { name, lastname, phone, address, email, password } = await request.json();

        // Buscar usuario, incluyendo los eliminados lógicamente
        const isUserInDB = await User.findOne({
            where: { email },
            paranoid: false
        });

        if (isUserInDB) {
            // Si el usuario existe y está eliminado lógicamente, restaurarlo
            if (isUserInDB.isSoftDeleted()) {
                await isUserInDB.restore();
                const hashedPassword = await bcrypt.hash(password, 10);
                await isUserInDB.update({ password: hashedPassword, name, lastname, phone, address });
                // Opcionalmente, podrías actualizar los datos del usuario restaurado aquí si lo deseas
                return NextResponse.json(isUserInDB);
            } else {
                // Si el usuario existe y no está eliminado, devolver error
                return NextResponse.json({ error: 'User already exists' }, { status: 400 });
            }
        } else {
            // Si el usuario no existe, crearlo normalmente
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({ name, lastname, phone, address, email, password: hashedPassword });
            return NextResponse.json(user);
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error creating user' }, { status: 500 });
    }
}

// Get users
export async function GET() {
    try {
        const users = await User.findAll({
            include: [{
                association: User.associations.Roles,
                through: { attributes: [] },
                attributes: ['id', 'name'],
            }],
            where: { id: { [Op.ne]: 1 } },
        });
        return NextResponse.json(users);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error getting users' }, { status: 500 });
    }
}