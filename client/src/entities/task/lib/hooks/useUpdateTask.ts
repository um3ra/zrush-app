import { useMutation, useQueryClient } from "@tanstack/react-query";
import { taskService, TypeTaskFormState } from "@/shared/api/api-task";

export const useUpdateTask = (key?: string) => {
    const queryClient = useQueryClient();
    const { mutate: updateTask } = useMutation({
        mutationKey: ["updateTask", key],
        mutationFn: ({ id, data }: { id: string; data: TypeTaskFormState }) =>
            taskService.updateTask(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["task"] });
        }
    });
    return { updateTask };
};
