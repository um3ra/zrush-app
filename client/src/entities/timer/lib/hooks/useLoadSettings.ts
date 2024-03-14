import { useQuery } from "@tanstack/react-query";
import { timerService } from "@/shared/api/api-timer";

export function useLoadSettings() {
    const { data, isSuccess: isSettingsSuccess } = useQuery({
        queryKey: ["timerSettings"],
        queryFn: () => timerService.getTimerSettings()
    });

    const workInterval = data?.workInterval ?? 50;
    const breakInterval = data?.breakInterval ?? 10;
    const intervalCount = data?.intervalCount ?? 7;

    return { workInterval, breakInterval, intervalCount, isSettingsSuccess };
}
