import { useLoadSettings } from "@/entities/timer/lib/hooks/useLoadSettings";
import { useProfile } from "@/entities/user/lib/hooks/useProfile";
import { TypeTimerSettingsForm } from "@/shared/api/api-timer";
import { TypeUserForm } from "@/shared/api/api-user/user.types";
import { useEffect } from "react";
import { UseFormReset } from "react-hook-form";

export const useInitialData = (
    reset: UseFormReset<TypeUserForm & TypeTimerSettingsForm>
) => {
    const { data: profileData, isSuccess: profileSuccess } = useProfile();
    const { breakInterval, workInterval, intervalCount, isSettingsSuccess } =
        useLoadSettings();

    useEffect(() => {
        if (profileData && isSettingsSuccess) {
            reset({
                breakInterval,
                workInterval,
                intervalCount,
                email: profileData.email,
                name: profileData.name
            });
        }
    }, [isSettingsSuccess, profileData, profileSuccess]);
};
