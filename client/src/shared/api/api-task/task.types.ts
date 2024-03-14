import { IRoot } from "../root-api.types";

enum EnumTaskPriority {
    LOW = "LOW",
    MEDIUM = "MEDIUM",
    HIGH = "HIGH"
}

export interface ITaskResponse extends IRoot {
    name: string;
    priority?: EnumTaskPriority;
    isCompleted?: boolean;
}

export interface IWeek {
    interval: string;
    allTasks: number;
    completedTasks: number;
}

export interface IStatisticResponse {
    currentMonth: IWeek[];
    totalCompletedTasks: number;
    totalTasks: number;
    dayStat: Record<string, number>;
}

export type TypeTaskFormState = Partial<
    Omit<ITaskResponse, "id" | "updatedAt">
>;
