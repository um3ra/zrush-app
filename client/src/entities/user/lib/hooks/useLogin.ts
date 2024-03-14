import { authService } from "@/shared/api/api-user/auth.service";
import { LoginDto } from "@/shared/api/api-user/user.types";
import { extractErrorMessage } from "@/shared/lib/error.helper";
import { useRouter } from "@/shared/lib/locales";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useLogin = () => {
    const { push } = useRouter();

    const { mutate: loginUser } = useMutation({
        mutationKey: ["login"],
        mutationFn: (dto: LoginDto) => authService.login(dto),
        onSuccess: () => {
            toast.success("login success");
            push("/i");
        },
        onError: (error) => {
            toast.error(extractErrorMessage(error));
        }
    });

    return { loginUser };
};
