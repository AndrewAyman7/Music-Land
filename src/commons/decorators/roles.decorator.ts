import { SetMetadata } from "@nestjs/common";
import { Role } from "../enums/role.enum";

export const Roles = (roles:Role[]) => SetMetadata('roles', roles);  // Arrow Function
// 3shan t3mly Metadata lel Decorator , Descriprion lel Controller