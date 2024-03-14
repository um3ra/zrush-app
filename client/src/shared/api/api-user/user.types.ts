import { IRoot } from "../root-api.types";

export interface IUser extends IRoot {
    name?: string;
    email?: string;
}

export interface LoginDto {
    email: string;
    password: string;
}

export interface RegisterDto extends LoginDto {
    name: string;
    matchingPassword: string;
}

export interface IAuthResponse {
    accessToken: string;
    user: IUser;
}

export type TypeUserForm = Partial<IUser & { password: string }>;
