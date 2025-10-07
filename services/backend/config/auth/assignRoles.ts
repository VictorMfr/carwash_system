// Assign roles to users (robusto y sin N+1)

import User from "../../models/auth/user";
import defaultUsers from "@/constants/backend/db/defaultUsers";
import UserRole from "../../models/auth/user_role";
import Role from "../../models/auth/role";

export default async function assignRoles() {
  // 1) Cargar data base
  const [users, roles, userRoles] = await Promise.all([
    User.findAll(),
    Role.findAll(),
    UserRole.findAll()
  ]);

  // 2) Índices en memoria
  const userByEmail = new Map<string, any>(
    users.map(u => [String(u.get("email")).toLowerCase(), u])
  );

  const roleIdByName = new Map<string, number>(
    roles.map(r => [String(r.get("name")), Number(r.get("id"))])
  );

  const assignedPair = new Set<string>(
    userRoles.map(ur => `${ur.get("userId")}:${ur.get("roleId")}`)
  );

  // 3) Construir los pendientes sin duplicados
  const assignments: Array<{ userId: number; roleId: number }> = [];

  for (const u of defaultUsers) {
    const emailKey = String(u.email).toLowerCase();

    // 3.1) Asegurar el usuario existe (crear si falta) y actualizar índice
    let userInstance = userByEmail.get(emailKey);
    if (!userInstance) {
      userInstance = await User.create(u);
      userByEmail.set(emailKey, userInstance);
      console.warn(
        `Se creó el usuario ${u.name} ${u.lastname} (${u.email}). Esta función está pensada para asignar roles.`
      );
    }

    const userId = Number(userInstance.get("id"));

    // 3.2) Traducir roles por nombre -> id con validación
    for (const roleName of u.roles) {
      const roleId = roleIdByName.get(roleName);
      if (!roleId) {
        console.warn(`Rol no encontrado: "${roleName}". Omite asignación para ${u.email}.`);
        continue;
      }

      const key = `${userId}:${roleId}`;
      if (!assignedPair.has(key)) {
        assignments.push({ userId, roleId });
        assignedPair.add(key); // evita duplicados en el mismo run
      }
    }
  }

  // 4) Inserción bulk (solo si hay algo que insertar)
  if (assignments.length > 0) {
    await UserRole.bulkCreate(assignments /*, { ignoreDuplicates: true }*/);
  }

  return { createdAssignments: assignments.length };
}
