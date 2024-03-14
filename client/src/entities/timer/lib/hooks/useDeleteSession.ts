import { useMutation, useQueryClient } from "@tanstack/react-query";
import { timerService } from "@/shared/api/api-timer";

export function useDeleteSession(onDeleteSuccess: () => void) {
    const queryClient = useQueryClient();

    const { mutate: deleteSession, isPending: isDeletePending } = useMutation({
        mutationKey: ["deleteSession"],
        mutationFn: (id: string) => timerService.deleteSession(id),
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: ["getTodaySession"]
            });
            onDeleteSuccess();
        }
    });
    return { deleteSession, isDeletePending };
}
