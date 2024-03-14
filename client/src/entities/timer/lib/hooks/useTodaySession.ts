import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { timerService } from "@/shared/api/api-timer";
import { useLoadSettings } from "./useLoadSettings";
import { useTimerStore } from "../../model/store";

export function useTodaySession() {
    const { workInterval } = useLoadSettings();
    const store = useTimerStore();

    const {
        data: sessionsResponse,
        isLoading,
        isSuccess
    } = useQuery({
        queryKey: ["getTodaySession"],
        queryFn: () => timerService.getTodaySession()
    });

    const rounds = sessionsResponse?.rounds;

    useEffect(() => {
        if (isSuccess && rounds) {
            const activeRound = rounds.find((round) => !round.isCompleted);
            if (activeRound && activeRound?.totalSeconds !== 0) {
                store.setSecondsLeft(activeRound.totalSeconds);
            }
            activeRound && store.setActiveRound(activeRound);
            store.setRounds(rounds);
        }
    }, [isSuccess, rounds]);

    return { sessionsResponse, isLoading, workInterval };
}
