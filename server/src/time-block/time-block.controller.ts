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
import { TimeBlockService } from "./time-block.service";
import { Auth, CurrentUser } from "src/lib/decorators";
import { UpdateOrderDto, TimeBlockDto } from "./dto";

@Auth()
@Controller("time-block")
export class TimeBlockController {
    constructor(private readonly timeBlockService: TimeBlockService) {}

    @Get()
    getAll(@CurrentUser("id") userId: string) {
        return this.timeBlockService.getAll(userId);
    }

    @Post()
    create(@CurrentUser("id") userId: string, @Body() dto: TimeBlockDto) {
        return this.timeBlockService.create(userId, dto);
    }

    @Put("order")
    @HttpCode(HttpStatus.OK)
    updateOrder(@Body() dto: UpdateOrderDto) {
        return this.timeBlockService.updateOrder(dto.ids);
    }

    @Put(":id")
    update(
        @CurrentUser("id") userId: string,
        @Param("id") timeBlokId: string,
        @Body() dto: TimeBlockDto
    ) {
        return this.timeBlockService.update(timeBlokId, userId, dto);
    }

    @Delete("/:id")
    @HttpCode(HttpStatus.OK)
    delete(
        @Param("id") timeBlockId: string,
        @CurrentUser("id") userId: string
    ) {
        return this.timeBlockService.delete(timeBlockId, userId);
    }
}
