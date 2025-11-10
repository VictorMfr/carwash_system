import { User } from "@/services/backend/models/associations";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { Op } from "sequelize";
import { UserCreateSchema, UserObjectCreateSchema } from "@/lib/definitions";
import { handleServerError } from "@/lib/error";

// Create user
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, lastname, phone, address, email, password } = UserCreateSchema.parse(body);

        const isUserInDB = await User.findOne({
            where: { email },
            paranoid: false
        });

        if (isUserInDB) {
            if ((isUserInDB as any).isSoftDeleted?.()) {
                await (isUserInDB as any).restore();
                const hashedPassword = await bcrypt.hash(password, 10);
                await isUserInDB.update({ password: hashedPassword, name, lastname, phone, address });
                return NextResponse.json(isUserInDB);
            }
            return NextResponse.json({ error: 'User already exists' }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, lastname, phone, address, email, password: hashedPassword });
        return NextResponse.json(user);
    } catch (error) {
        return handleServerError(error);
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

        if (!users) {
            return NextResponse.json([]);
        }

        // Transform dates into dd/mm/yyyy hh:mm AM/PM
        const transformedUsers = users.map(user => ({
            ...user.toJSON(),
            created_at: user.created_at?.toLocaleDateString('es-ES') + ' ' + user.created_at?.toLocaleTimeString('es-ES', { hour12: true }),
            updated_at: user.updated_at?.toLocaleDateString('es-ES') + ' ' + user.updated_at?.toLocaleTimeString('es-ES', { hour12: true })
        }));
        
        return NextResponse.json(transformedUsers);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error getting users' }, { status: 500 });
    }
}

// Delete bulk users
export async function DELETE(request: Request) {
    try {
        const body = await request.json();
        const { ids } = body;
        await User.destroy({ where: { id: { [Op.in]: ids } } });
        return NextResponse.json({ message: 'Users deleted successfully' });
    } catch (error) {
        return handleServerError(error);
    }
}