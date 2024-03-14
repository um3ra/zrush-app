"use client";

import { useLogin } from "@/entities/user/lib/hooks";
import { LoginDto } from "@/shared/api/api-user/user.types";
import { Button } from "@/shared/ui/Button";
import { Field } from "@/shared/ui/Field";
import { useTranslations } from "next-intl";
import { SubmitHandler, useForm } from "react-hook-form";

export const LoginForm = () => {
    const t = useTranslations("Form");
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginDto>({ mode: "onTouched" });
    const { loginUser } = useLogin();

    const onSubmit: SubmitHandler<LoginDto> = (data) => {
        loginUser(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-3xl my-7 font-bold">{t("login-title")}</h1>
            <div className="flex flex-col mx-auto gap-5 w-3/4">
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
                            required: t("field-required")
                        })
                    }}
                    label={t("password")}
                    errorMessage={errors.password?.message}
                />
            </div>

            <Button className="mt-7">{t("login-title")}</Button>
        </form>
    );
};
