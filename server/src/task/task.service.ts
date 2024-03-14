import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { TaskDto } from "./dto/task.dto";
import {
    addDays,
    addWeeks,
    format,
    getDaysInMonth,
    startOfMonth
} from "date-fns";
import { dayNameFormat } from "src/lib/day-name-format";
import { Task } from "@prisma/client";

@Injectable()
export class TaskService {
    constructor(private readonly prismaService: PrismaService) {}

    getAll(userId: string) {
        return this.prismaService.task.findMany({
            where: { userId }
        });
    }

    createTask(userId: string, dto: TaskDto) {
        return this.prismaService.task.create({
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

    updateTask(id: string, userId: string, dto: Partial<TaskDto>) {
        return this.prismaService.task.update({
            where: { id, userId },
            data: dto
        });
    }

    deleteTask(id: string, userId: string) {
        return this.prismaService.task.delete({
            where: { id, userId }
        });
    }

    async getStatistics(userId: string) {
        const currentMonth = await this.getStatisticForEachWeek(
            startOfMonth(new Date()),
            userId
        );

        const tasks = await this.prismaService.task.findMany({
            where: {
                userId
            },
            select: {
                updatedAt: true,
                isCompleted: true
            }
        });

        const statisticData = {
            totalTasks: tasks.length,
            currentMonth,
            totalCompletedTasks: tasks.filter((el) => el.isCompleted).length,
            dayStat: this.getDayStat(tasks.filter((el) => el.isCompleted))
        };

        return statisticData;
    }

    private async getStatisticForEachWeek(startOfMonth: Date, userId: string) {
        const promises = Array.from({ length: 5 }, async (_, i) => {
            const weekNum = i + 1;
            const min =
                weekNum === 1
                    ? startOfMonth
                    : addWeeks(startOfMonth, weekNum - 1);
            const max =
                weekNum === 5
                    ? addDays(
                          addWeeks(startOfMonth, weekNum - 1),
                          getDaysInMonth(startOfMonth) % 4
                      )
                    : addWeeks(startOfMonth, weekNum);

            const taskInWeek = await this.prismaService.task.findMany({
                where: {
                    userId,
                    createdAt: {
                        gte: min,
                        lte: max
                    }
                },
                select: {
                    isCompleted: true
                },

                orderBy: {
                    createdAt: "asc"
                }
            });

            return {
                interval: format(min, "dd MMM") + " - " + format(max, "dd MMM"),
                allTasks: taskInWeek.length,
                completedTasks: taskInWeek.filter((el) => el.isCompleted).length
            };
        });

        const weeks = await Promise.all(promises);

        return weeks;
    }

    private getDayStat(tasks: Partial<Task>[]) {
        const dayStat = tasks.reduce((acc, task) => {
            const day = dayNameFormat(task.updatedAt);

            acc[day] = acc[day] ? acc[day] + 1 : 1;
            return acc;
        }, {});

        return dayStat;
    }
}
