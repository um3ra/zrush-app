import { IsNumber, IsOptional, Max } from "class-validator";

export class TimerSettingsDto {
    @IsOptional()
    @IsNumber()
    workInterval;

    @IsOptional()
    @IsNumber()
    breakInterval;

    @IsOptional()
    @IsNumber()
    @Max(10)
    intervalCount;
}
