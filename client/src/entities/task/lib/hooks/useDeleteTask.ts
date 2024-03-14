import { useMutation, useQueryClient } from "@tanstack/react-query";
import { taskService } from "@/shared/api/api-task";

export const useDeleteTask = () => {
    const queryClient = useQueryClient();

    const { mutate: deleteTask, isPending: isDeletePending } = useMutation({
        mutationKey: ["deleteTask"],
        mutationFn: (id: string) => taskService.deleteTask(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["task"]
            });
        }
    });

    return { deleteTask, isDeletePending };
};
