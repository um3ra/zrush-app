import { TimerSettingsDto, timerService } from "@/shared/api/api-timer";
import { userService } from "@/shared/api/api-user";
import { TypeUserForm } from "@/shared/api/api-user/user.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateSettings = () => {
    const queryClient = useQueryClient();

    const { mutate: updateTimerSettings, isPending: timerSettingsPending } =
        useMutation({
            mutationKey: ["updateSettings"],
            mutationFn: (dto: TimerSettingsDto) =>
                timerService.updateSettings(dto),

            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: ["timerSettings"]
                });

                toast.success("Timer settings updated successfully!");
            }
        });

    const { mutate: updateUser, isPending: userDataPending } = useMutation({
        mutationKey: ["updateUserData"],
        mutationFn: (dto: TypeUserForm) => userService.update(dto),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["profile"]
            });
            toast.success("User data updated successfully!");
        }
    });

    const isPending = timerSettingsPending || userDataPending;

    return { updateTimerSettings, updateUser, isPending };
};
