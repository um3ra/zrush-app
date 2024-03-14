import { IsBoolean, IsNumber, IsOptional } from "class-validator";

export class TimerRoundDto {
    @IsNumber()
    totalSeconds: number;

    @IsOptional()
    @IsBoolean()
    isCompleted: boolean;
}
