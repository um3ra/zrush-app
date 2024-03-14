import { useEffect } from "react";
import { useLoadSettings } from "./useLoadSettings";
import { useUpdateRound } from "./useUpdateRound";
import { useDeleteSession } from "./useDeleteSession";
import { useTodaySession } from "./useTodaySession";
import { useTimerActions } from "./useTimerActions";
import { useTimerStore } from "../../model/store";

export const useTimer = () => {
    const { breakInterval, workInterval } = useLoadSettings();
    const { updateRound, isUpdateRoundPending } = useUpdateRound();
    const store = useTimerStore();
    const { pauseHandler, nextRoundHandler, prevRoundHandler, play } =
        useTimerActions();
    const { isLoading, sessionsResponse } = useTodaySession();
    const { deleteSession } = useDeleteSession(() => {
        store.setBreakTime(false);
        store.setSecondsLeft(workInterval * 60);
    });

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (store.isRunning) {
            interval = setInterval(() => {
                store.setSecondsLeft(store.secondsLeft - 1);
            }, 1000);
        } else if (!store.isRunning && store.secondsLeft !== 0 && interval) {
            clearInterval(interval);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [store.isRunning, store.secondsLeft, workInterval, store.activeRound]);

    useEffect(() => {
        if (store.secondsLeft > 0) return;

        if (store.isBreakTime && store.activeRound?.id) {
            if (
                store.rounds &&
                store.activeRound.id ===
                    store.rounds[store.rounds.length - 1].id
            ) {
                store.setIsRunning(false);
                sessionsResponse && deleteSession(sessionsResponse.id);
            }
            updateRound({
                id: store.activeRound.id,
                data: { isCompleted: true, totalSeconds: 0 }
            });
            store.setBreakTime(false);
        } else {
            store.setBreakTime(true);
        }

        store.setSecondsLeft(
            (store.isBreakTime ? workInterval : breakInterval) * 60
        );
    }, [store.secondsLeft, store.isBreakTime, workInterval, breakInterval]);

    const reset = () => {
        store.setIsRunning(false);
        sessionsResponse && deleteSession(sessionsResponse.id);
    };

    const progressStyle = () => {
        const interval = store.isBreakTime ? breakInterval : workInterval;
        const progress = Math.floor(
            100 - (store.secondsLeft / (interval * 60)) * 100
        );
        return {
            width: progress + "%"
        };
    };

    return {
        pause: pauseHandler,
        play,
        next: nextRoundHandler,
        prev: prevRoundHandler,
        rounds: store.rounds,
        isUpdate: isUpdateRoundPending,
        sessionLoading: isLoading,
        session: sessionsResponse,
        isRunning: store.isRunning,
        activeRound: store.activeRound,
        secondsLeft: store.secondsLeft,
        reset,
        progressStyle
    };
};
