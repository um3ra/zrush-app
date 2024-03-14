import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Put
} from "@nestjs/common";
import { TaskService } from "./task.service";
import { Auth, CurrentUser } from "src/lib/decorators";
import { TaskDto } from "./dto/task.dto";

@Auth()
@Controller("user/tasks")
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    getAll(@CurrentUser("id") userId: string) {
        return this.taskService.getAll(userId);
    }

    @Post()
    create(@CurrentUser("id") userId: string, @Body() dto: TaskDto) {
        return this.taskService.createTask(userId, dto);
    }

    @Put("/:id")
    async update(
        @CurrentUser("id") userId: string,
        @Param("id") taskId: string,
        @Body() dto: TaskDto
    ) {
        return this.taskService.updateTask(taskId, userId, dto);
    }

    @Delete("/:id")
    @HttpCode(HttpStatus.OK)
    delete(@Param("id") taskId: string, @CurrentUser("id") userId: string) {
        return this.taskService.deleteTask(taskId, userId);
    }

    @Get("statistics")
    getStatistic(@CurrentUser("id") userId: string) {
        return this.taskService.getStatistics(userId);
    }
}
