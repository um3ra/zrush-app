import { useMutation, useQueryClient } from "@tanstack/react-query";

import { timerService } from "@/shared/api/api-timer";

export function useCreateSession() {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationKey: ["createNewSession"],
        mutationFn: () => timerService.createSession(),
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: ["getTodaySession"]
            });
        }
    });

    return { mutate, isPending };
}
