import defaultRoles from "@/constants/backend/db/defaultRoles";
import { Role } from "../../models/associations";

export default async function createRoles() {
    await Role.bulkCreate(defaultRoles);
}