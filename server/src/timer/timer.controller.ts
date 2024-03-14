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
import { TimerService } from "./timer.service";
import { Auth, CurrentUser } from "src/lib/decorators";
import { TimerRoundDto, TimerSessionDto, TimerSettingsDto } from "./dto";

@Auth()
@Controller("timer")
export class TimerController {
    constructor(private readonly timerService: TimerService) {}

    @Get("/today")
    getTodaySession(@CurrentUser("id") userId: string) {
        return this.timerService.getTodaySession(userId);
    }

    @Post()
    create(@CurrentUser("id") userId: string) {
        return this.timerService.createSession(userId);
    }

    @Put("/settings")
    @HttpCode(HttpStatus.OK)
    updateSettings(
        @CurrentUser("id") userId: string,
        @Body() dto: TimerSettingsDto
    ) {
        return this.timerService.updateTimerSettings(userId, dto);
    }

    @Put("/round/:id")
    @HttpCode(HttpStatus.OK)
    updateRound(@Param("id") roundId: string, @Body() dto: TimerRoundDto) {
        return this.timerService.updateRound(roundId, dto);
    }

    @Put(":id")
    @HttpCode(HttpStatus.OK)
    update(
        @Param("id") id: string,
        @CurrentUser("id") userId: string,
        @Body() dto: TimerSessionDto
    ) {
        return this.timerService.updateSession(id, userId, dto);
    }

    @Get("settings")
    getTimerSettings(@CurrentUser("id") userId: string) {
        return this.timerService.getTimerSettings(userId);
    }

    @Delete("/:id")
    @HttpCode(HttpStatus.OK)
    deleteSession(
        @Param("id") sessionId: string,
        @CurrentUser("id") userId: string
    ) {
        return this.timerService.deleteSession(sessionId, userId);
    }
}
