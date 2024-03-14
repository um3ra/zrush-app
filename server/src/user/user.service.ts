import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { genSaltSync, hashSync } from "bcryptjs";
import { UserDto } from "./dto/user.dto";

@Injectable()
export class UserService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(dto: Partial<User>) {
        const hashedPassword = this.hashPassword(dto.password);
        const user = await this.prismaService.user.create({
            data: {
                name: dto.name ?? "",
                email: dto.email,
                password: hashedPassword
            }
        });
        await this.prismaService.timerSettings.create({
            data: {
                user: {
                    connect: {
                        id: user.id
                    }
                }
            }
        });

        return user;
    }

    findByEmail(idOrEmail: string) {
        return this.prismaService.user.findFirst({
            where: {
                OR: [{ id: idOrEmail }, { email: idOrEmail }]
            }
        });
    }

    async update(id: string, dto: Partial<UserDto>) {
        let data = dto;

        if (data.password)
            data = { ...dto, password: this.hashPassword(dto.password) };

        return this.prismaService.user.update({
            where: { id },
            data: dto
        });
    }

    private hashPassword(password: string) {
        const salt = genSaltSync(10);
        return hashSync(password, salt);
    }
}
