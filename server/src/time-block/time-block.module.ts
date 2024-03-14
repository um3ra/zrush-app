import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { TimeBlockService } from "./time-block.service";
import { TimeBlockController } from "./time-block.controller";

@Module({
    imports: [PrismaModule],
    controllers: [TimeBlockController],
    providers: [TimeBlockService]
})
export class TimeBlockModule {}
