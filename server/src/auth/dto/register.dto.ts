import { IsEmail, IsString, MinLength, Validate } from "class-validator";
import { IsPasswordsMatchingConstraint } from "src/lib/decorators";

export class RegisterDto {
    @IsString()
    name: string;
    @IsEmail()
    email: string;
    @IsString()
    @MinLength(6, {
        message: "Password must be at least 6 characters long"
    })
    password: string;

    @Validate(IsPasswordsMatchingConstraint)
    matchingPassword: string;
}
