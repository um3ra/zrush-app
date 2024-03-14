import { useMutation, useQueryClient } from "@tanstack/react-query";

import { timeBlockService } from "@/shared/api/api-time-block";

export function useDeleteTimeBlock(itemId: string) {
    const queryClient = useQueryClient();

    const { mutate: deleteTimeBlock, isPending: isDeletePending } = useMutation(
        {
            mutationKey: ["delete time-block", itemId],
            mutationFn: () => timeBlockService.delete(itemId),
            onSuccess() {
                queryClient.invalidateQueries({
                    queryKey: ["time-blocks"]
                });
            }
        }
    );

    return { deleteTimeBlock, isDeletePending };
}
