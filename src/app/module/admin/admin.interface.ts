import { Role } from "../../../generated/prisma/enums";

export interface IUpdateAdminPayload {
    admin?: {
        name?: string;
        profilePhoto?: string;
        contactNumber?: string;
    
    },
    user?: {
        name?: string;
        image?: string;
        role ?: Role
    }
}