import { User } from "@prisma/client";
import { Exclude } from "class-transformer";

export class UserResponse implements User {
    id: string;
    email: string;
    name: string;
    @Exclude()
    password: string;
    @Exclude()
    createdAt: Date;
    updatedAt: Date;
    constructor(user: User) {
        Object.assign(this, user);
    }
}
