import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Put,
    UseInterceptors
} from "@nestjs/common";
import { UserService } from "./user.service";
import { Auth, CurrentUser } from "src/lib/decorators";
import { UserDto } from "./dto/user.dto";
import { UserResponse } from "./user.response";

@Auth()
@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @UseInterceptors(ClassSerializerInterceptor)
    @Get("/profile")
    async getProfile(@CurrentUser("id") id: string) {
        const user = await this.userService.findByEmailOrId(id);
        return new UserResponse(user);
    }

    @Put("/profile")
    @HttpCode(HttpStatus.OK)
    update(@CurrentUser("id") id: string, @Body() dto: UserDto) {
        return this.userService.update(id, dto);
    }
}
