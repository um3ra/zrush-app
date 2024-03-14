import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
    timeBlockService,
    type TypeTimeBlockFormState
} from "@/shared/api/api-time-block";

export function useCreateTimeBlock() {
    const queryClient = useQueryClient();

    const { mutate: createTimeBlock, isPending } = useMutation({
        mutationKey: ["create time-block"],
        mutationFn: (data: TypeTimeBlockFormState) =>
            timeBlockService.create(data),
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: ["time-blocks"]
            });
        }
    });

    return {
        createTimeBlock,
        isPending
    };
}
