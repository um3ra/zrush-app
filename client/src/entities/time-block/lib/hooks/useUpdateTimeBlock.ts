import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
    timeBlockService,
    type TypeTimeBlockFormState
} from "@/shared/api/api-time-block";

export function useUpdateTimeBlock(key?: string) {
    const queryClient = useQueryClient();

    const { mutate: updateTimeBlock } = useMutation({
        mutationKey: ["update time-block", key],
        mutationFn: ({
            id,
            data
        }: {
            id: string;
            data: TypeTimeBlockFormState;
        }) => timeBlockService.update(id, data),
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: ["time-blocks"]
            });
        }
    });

    return { updateTimeBlock };
}
