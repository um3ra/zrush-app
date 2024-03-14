import { useLoadSettings } from "./useLoadSettings";
import { useUpdateRound } from "./useUpdateRound";
import { useTimerStore } from "../../model/store";

export function useTimerActions() {
    const { workInterval, breakInterval } = useLoadSettings();
    const { updateRound, updateRoundIsSuccess } = useUpdateRound();
    const store = useTimerStore();

    const pauseHandler = () => {
        store.setIsRunning(false);

        if (!store.activeRound?.id || store.secondsLeft === workInterval * 60)
            return;
        const interval = store.isBreakTime ? breakInterval : workInterval;

        updateRound({
            id: store.activeRound?.id,
            data: {
                totalSeconds: store.secondsLeft,
                isCompleted: Math.floor(store.secondsLeft / 60) >= interval
            }
        });
    };

    const nextRoundHandler = () => {
        if (!store.activeRound?.id) return;

        if (store.isBreakTime) store.setBreakTime(false);

        updateRound({
            id: store.activeRound?.id,
            data: {
                isCompleted: true,
                totalSeconds: workInterval * 60
            }
        });
    };

    const prevRoundHandler = () => {
        const lastCompletedRound = store.rounds?.findLast(
            (round) => round.isCompleted
        );
        if (!lastCompletedRound?.id) return;

        if (store.isBreakTime) store.setBreakTime(false);

        updateRound({
            id: lastCompletedRound.id,
            data: {
                isCompleted: false,
                totalSeconds: workInterval * 60
            }
        });

        if (updateRoundIsSuccess) {
            store.setActiveRound(lastCompletedRound);
        }
    };

    const play = () => {
        store.setIsRunning(true);
    };

    return {
        pauseHandler,
        nextRoundHandler,
        prevRoundHandler,
        play
    };
}
