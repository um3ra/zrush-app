import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { TimeBlockDto } from "./dto";

@Injectable()
export class TimeBlockService {
    constructor(private readonly prismaService: PrismaService) {}

    getAll(userId: string) {
        return this.prismaService.timeBlock.findMany({
            where: {
                userId
            },
            orderBy: {
                order: "asc"
            }
        });
    }

    create(userId: string, dto: TimeBlockDto) {
        return this.prismaService.timeBlock.create({
            data: {
                ...dto,
                user: {
                    connect: {
                        id: userId
                    }
                }
            }
        });
    }

    update(timeBlockId: string, userId: string, dto: Partial<TimeBlockDto>) {
        return this.prismaService.timeBlock.update({
            where: {
                id: timeBlockId,
                userId
            },
            data: dto
        });
    }

    delete(timeBlockId: string, userId: string) {
        return this.prismaService.timeBlock.delete({
            where: {
                id: timeBlockId,
                userId
            }
        });
    }

    async updateOrder(ids: string[]) {
        return await this.prismaService.$transaction(
            ids.map((id, index) =>
                this.prismaService.timeBlock.update({
                    where: { id },
                    data: {
                        order: index
                    }
                })
            )
        );
    }
}
