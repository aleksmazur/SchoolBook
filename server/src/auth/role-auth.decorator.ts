import { SetMetadata } from "@nestjs/common";
import { Roles } from "../roles/roles.enum";

export const ROLE_KEY = "role";

export const RoleControl = (...role: Roles[]) => SetMetadata(ROLE_KEY, role);
