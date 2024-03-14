import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import {
    TimerSettingsDto,
    TimerSessionDto,
    TimerRoundDto
} from "src/timer/dto";

@Injectable()
export class TimerService {
    constructor(private readonly prismaService: PrismaService) {}

    getTodaySession(userId: string) {
        const today = new Date().toISOString().split("T")[0];
        return this.prismaService.timerSession.findFirst({
            where: {
                createdAt: {
                    gte: new Date(today)
                },
                userId
            },
            include: {
                rounds: {
                    orderBy: {
                        id: "asc"
                    }
                }
            }
        });
    }
    updateTimerSettings(userId: string, dto: Partial<TimerSettingsDto>) {
        return this.prismaService.timerSettings.update({
            where: {
                userId
            },
            data: dto
        });
    }

    getTimerSettings(userId: string) {
        return this.prismaService.timerSettings.findUnique({
            where: { userId }
        });
    }

    async createSession(userId: string) {
        const todaySession = await this.getTodaySession(userId);

        if (todaySession) return todaySession;

        const settings = await this.getTimerSettings(userId);

        if (!settings) throw new NotFoundException("settings not found");

        return this.prismaService.timerSession.create({
            data: {
                rounds: {
                    createMany: {
                        data: Array.from(
                            { length: settings.intervalCount },
                            () => ({
                                totalSeconds: settings.workInterval * 60
                            })
                        )
                    }
                },
                user: {
                    connect: {
                        id: userId
                    }
                }
            },
            include: {
                rounds: true
            }
        });
    }

    updateSession(id: string, userId: string, dto: Partial<TimerSessionDto>) {
        return this.prismaService.timerSession.update({
            where: {
                userId,
                id
            },
            data: dto
        });
    }

    deleteSession(id: string, userId: string) {
        return this.prismaService.timerSession.delete({
            where: {
                id,
                userId
            }
        });
    }

    async updateRound(roundId: string, dto: Partial<TimerRoundDto>) {
        const round = await this.prismaService.timerRound.findUnique({
            where: { id: roundId }
        });

        if (!round)
            throw new NotFoundException(
                `round with id ${roundId} was not found!`
            );

        return this.prismaService.timerRound.update({
            where: round,
            data: dto
        });
    }
}
