import { authService } from "@/shared/api/api-user/auth.service";
import { useRouter } from "@/shared/lib/locales/navigation";
import { useMutation } from "@tanstack/react-query";

export const useLogout = () => {
    const { push } = useRouter();
    const { mutate: logout } = useMutation({
        mutationFn: () => authService.logout(),
        mutationKey: ["logout"],
        onSuccess: () => push("/")
    });
    return { logout };
};
