import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";

export class UserDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @MinLength(6, {
        message: "Password must be at least 6 characters long"
    })
    @IsString()
    password?: string;
}
