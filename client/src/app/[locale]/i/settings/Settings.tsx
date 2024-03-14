"use client";

import { useLogout } from "@/entities/user/lib/hooks";
import { TypeTimerSettingsForm } from "@/shared/api/api-timer";
import { TypeUserForm } from "@/shared/api/api-user/user.types";
import { Button, Field } from "@/shared/ui";
import { LogOut } from "lucide-react";
import { useTranslations } from "next-intl";
import { SubmitHandler, useForm } from "react-hook-form";
import { useInitialData } from "./useInitialFormData";
import { useUpdateSettings } from "./useUpdateSettings";

type SettingsForm = TypeTimerSettingsForm & TypeUserForm;

export const Settings = () => {
    const { register, handleSubmit, reset } = useForm<SettingsForm>();
    const { updateTimerSettings, updateUser, isPending } = useUpdateSettings();
    const t = useTranslations("Settings");

    const formTranslation = useTranslations("Form");
    const { logout } = useLogout();

    useInitialData(reset);

    const onSubmit: SubmitHandler<SettingsForm> = (data) => {
        updateUser({
            email: data.email,
            name: data.name,
            password: data.password || undefined
        });

        updateTimerSettings({
            workInterval: data.workInterval,
            breakInterval: data.breakInterval,
            intervalCount: data.intervalCount
        });
    };

    return (
        <form
            className="sm:w-1/2 sm:min-w-[32rem] border border-primary/60 bg-primary/[3%] rounded-xl p-6 text-center"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="flex flex-col justify-around sm:flex-row gap-3">
                <div className="flex flex-col justify-between">
                    <h2 className="text-3xl my-4 font-bold">
                        {t("user-data")}
                    </h2>
                    <div>
                        <Field
                            label={formTranslation("email")}
                            inputProps={{
                                ...register("email", {
                                    required: "Email is required!",
                                    pattern: {
                                        value: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
                                        message: "Email is invalid!"
                                    }
                                }),
                                placeholder:
                                    formTranslation("email-placeholder"),
                                type: "email"
                            }}
                        />

                        <Field
                            label={formTranslation("name")}
                            inputProps={{
                                ...register("name"),
                                placeholder: formTranslation("name-placeholder")
                            }}
                        />

                        <Field
                            label={formTranslation("password")}
                            inputProps={{
                                ...register("password"),
                                placeholder: formTranslation(
                                    "password-placeholder"
                                )
                            }}
                        />
                    </div>
                </div>

                <div className="flex flex-col justify-between">
                    <h2 className="text-3xl my-4 font-bold">
                        {t("timer-setting")}
                    </h2>
                    <div>
                        <Field
                            label={t("work-interval")}
                            inputProps={{
                                ...register("workInterval", {
                                    valueAsNumber: true
                                }),
                                placeholder: t("work-interval-placeholder")
                            }}
                        />

                        <Field
                            label={t("break-interval")}
                            inputProps={{
                                ...register("breakInterval", {
                                    valueAsNumber: true
                                }),
                                placeholder: t("break-interval-placeholder")
                            }}
                        />

                        <Field
                            label={t("interval-count")}
                            inputProps={{
                                ...register("intervalCount", {
                                    valueAsNumber: true
                                }),
                                placeholder: t("interval-count-placeholder")
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className="flex justify-around items-center">
                <Button
                    buttonProps={{
                        disabled: isPending
                    }}
                    className="w-1/2 bg-accent/60 my-6 text-2xl"
                >
                    {formTranslation("save")}
                </Button>
                <div className="text-center ">
                    <button
                        className="text-xl flex hover:text-accent transition duration-300"
                        onClick={(e) => {
                            e.preventDefault();
                            logout();
                        }}
                    >
                        {t("logout")}
                        <LogOut className="mx-2 cursor-pointer" size={28} />
                    </button>
                </div>
            </div>
        </form>
    );
};
