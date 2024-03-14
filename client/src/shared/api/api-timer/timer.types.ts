import { IRoot } from "../root-api.types";

export interface IPomodoroRoundResponse extends IRoot {
    isCompleted?: boolean;
    totalSeconds: number;
    pomodoroSessionId: string;
}

export interface IPomodoroSessionResponse extends IRoot {
    isCompleted?: boolean;
    totalSeconds: number;
    rounds?: IPomodoroRoundResponse[];
}

export interface TimerSettingsDto {
    workInterval?: number;
    breakInterval?: number;
    intervalCount?: number;
}

export type TypeTimerSettingsForm = TimerSettingsDto;

export type TypePomodoroRoundState = Partial<
    Omit<IPomodoroRoundResponse, "id" | "createdAt" | "updatedAt">
>;

export type TypePomodoroSessionState = Partial<
    Omit<IPomodoroSessionResponse, "id" | "createdAt" | "updatedAt">
>;
