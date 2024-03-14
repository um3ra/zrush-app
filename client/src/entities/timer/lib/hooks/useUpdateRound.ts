import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TypePomodoroRoundState } from "@/shared/api/api-timer";
import { timerService } from "@/shared/api/api-timer";

export const useUpdateRound = () => {
    const queryClient = useQueryClient();
    const {
        mutate: updateRound,
        isPending: isUpdateRoundPending,
        isSuccess: updateRoundIsSuccess
    } = useMutation({
        mutationKey: ["updateRound"],
        mutationFn: ({
            id,
            data
        }: {
            id: string;
            data: TypePomodoroRoundState;
        }) => timerService.updateRound(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["getTodaySession"]
            });
        }
    });

    return { updateRound, isUpdateRoundPending, updateRoundIsSuccess };
};
