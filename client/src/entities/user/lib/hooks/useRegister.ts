import { authService } from "@/shared/api/api-user";
import { RegisterDto } from "@/shared/api/api-user/user.types";
import { extractErrorMessage } from "@/shared/lib/error.helper";
import { useRouter } from "@/shared/lib/locales";
import { useMutation } from "@tanstack/react-query";
import { DASHBOARD_PAGES } from "@/shared/config/pages-url.config";
import { toast } from "sonner";

export const useRegister = () => {
    const { push } = useRouter();
    const { mutate: registerUser } = useMutation({
        mutationKey: ["register"],
        mutationFn: (dto: RegisterDto) => authService.register(dto),
        onSuccess: () => {
            toast.success("register success");
            push(DASHBOARD_PAGES.HOME);
        },
        onError: (error) => {
            toast.error(extractErrorMessage(error));
        }
    });

    return { registerUser };
};
