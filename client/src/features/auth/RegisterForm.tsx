import { useRegister } from "@/entities/user/lib/hooks";
import type { RegisterDto } from "@/shared/api/api-user/user.types";
import { Button, Field } from "@/shared/ui";
import { useTranslations } from "next-intl";
import { useForm, type SubmitHandler } from "react-hook-form";

export const RegisterForm = () => {
    const { registerUser } = useRegister();
    const t = useTranslations("Form");
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<RegisterDto>({
        mode: "onTouched"
    });

    const onSubmit: SubmitHandler<RegisterDto> = (data) => {
        registerUser(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-3xl my-7 font-bold">{t("register-title")}</h1>

            <div className="flex flex-col mx-auto gap-5 w-3/4">
                <Field
                    inputProps={{ type: "text", ...register("name") }}
                    label={t("name")}
                />

                <Field
                    inputProps={{
                        type: "email",
                        ...register("email", {
                            pattern: {
                                value: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
                                message: t("email-valid")
                            },
                            required: t("field-required")
                        })
                    }}
                    label={t("email")}
                    errorMessage={errors.email?.message}
                />
                <Field
                    inputProps={{
                        type: "password",
                        ...register("password", {
                            required: t("field-required"),
                            minLength: {
                                value: 6,
                                message: t("password-length-valid")
                            }
                        })
                    }}
                    errorMessage={errors.password?.message}
                    label={t("password")}
                />

                <Field
                    inputProps={{
                        type: "password",
                        ...register("matchingPassword", {
                            required: t("field-required")
                        })
                    }}
                    label={t("matching-password")}
                    errorMessage={errors.matchingPassword?.message}
                />
            </div>
            <Button className="mt-7">{t("register-title")}</Button>
        </form>
    );
};
