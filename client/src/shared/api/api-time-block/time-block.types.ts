import { IRoot } from "../root-api.types";

export interface ITimeBlockResponse extends IRoot {
    name: string;
    color?: string;
    duration: number;
    order: number;
}

export type TypeTimeBlockFormState = Partial<
    Omit<ITimeBlockResponse, "createdAt" | "updatedAt">
>;
