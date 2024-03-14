import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type {
    IPomodoroRoundResponse,
    IPomodoroSessionResponse
} from "@/shared/api/api-timer";

export interface ITimerState {
    isRunning: boolean;
    secondsLeft: number;
    activeRound?: IPomodoroRoundResponse;
    rounds?: IPomodoroRoundResponse[];
    isBreakTime: boolean;
    session?: IPomodoroSessionResponse;

    setBreakTime: (isBreakTime: boolean) => void;
    setIsRunning: (isRunning: boolean) => void;
    setSecondsLeft: (seconds: number) => void;
    setRounds: (rounds: IPomodoroRoundResponse[]) => void;
    setActiveRound: (round: IPomodoroRoundResponse) => void;
    setSession: (session: IPomodoroSessionResponse) => void;
}

export const useTimerStore = create<ITimerState>()(
    devtools((set) => ({
        isRunning: false,
        secondsLeft: 50,
        activeRound: undefined,
        rounds: undefined,
        isBreakTime: false,
        session: undefined,

        setIsRunning: (isRunning) =>
            set((state) => ({ ...state, isRunning: isRunning })),
        setSecondsLeft: (seconds) =>
            set((state) => ({ ...state, secondsLeft: seconds })),
        setActiveRound: (round) =>
            set((state) => ({ ...state, activeRound: round })),
        setRounds: (rounds) => set((state) => ({ ...state, rounds })),
        setBreakTime: (isBreakTime) =>
            set((state) => ({ ...state, isBreakTime })),
        setSession: (session) => set((state) => ({ ...state, session }))
    }))
);
