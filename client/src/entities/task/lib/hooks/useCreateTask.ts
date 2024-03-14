import { useMutation, useQueryClient } from "@tanstack/react-query";
import { taskService, TypeTaskFormState } from "@/shared/api/api-task";

export const useCreateTask = (key?: string) => {
    const queryClient = useQueryClient();
    const { mutate: createTask } = useMutation({
        mutationKey: ["createTask", key],
        mutationFn: (data: TypeTaskFormState) => taskService.createTask(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["task"] });
        }
    });

    return { createTask };
};
