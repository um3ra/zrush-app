import { type TypeTimeBlockFormState } from "@/shared/api/api-time-block";
import {
    Controller,
    type SubmitHandler,
    useFormContext
} from "react-hook-form";
import {
    useCreateTimeBlock,
    useUpdateTimeBlock
} from "@/entities/time-block/lib/hooks";
import { Field, Button, SingleSelect } from "@/shared/ui";
import { COLORS } from "./colors.data";
import { useTranslations } from "next-intl";

export const TimeBlockingForm = () => {
    const { register, control, watch, reset, handleSubmit, getValues } =
        useFormContext<TypeTimeBlockFormState>();

    const existsId = watch("id");

    const { updateTimeBlock } = useUpdateTimeBlock(existsId);
    const { createTimeBlock, isPending } = useCreateTimeBlock();
    const t = useTranslations("Form");

    const onSubmit: SubmitHandler<TypeTimeBlockFormState> = (data) => {
        const { color, id, ...rest } = data;
        const dto = { ...rest, color: color || undefined };

        if (id) {
            updateTimeBlock({
                id,
                data: dto
            });
        } else {
            createTimeBlock(dto);
        }

        reset({
            color: COLORS[COLORS.length - 1],
            duration: 0,
            name: "",
            id: undefined,
            order: 1
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-3/5">
            <Field
                label={t("name-placeholder")}
                inputProps={{
                    ...register("name", {
                        required: true
                    }),

                    placeholder: t("name-placeholder")
                }}
                className="mb-4"
            />

            <Field
                label={t("duration")}
                inputProps={{
                    ...register("duration", {
                        required: true,
                        valueAsNumber: true
                    }),

                    placeholder: t("duration")
                }}
                className="mb-4"
            />

            <div>
                <span className="inline-block mb-1.5">{t("color")}</span>
                <Controller
                    control={control}
                    name={"color"}
                    render={({ field: { value, onChange } }) => (
                        <SingleSelect
                            data={COLORS.map((item) => ({
                                value: item,
                                label: item
                            }))}
                            onChange={onChange}
                            value={value || COLORS[COLORS.length - 1]}
                            isColorSelect
                        />
                    )}
                />
            </div>

            <Button
                buttonProps={{
                    type: "submit",
                    disabled: isPending
                }}
                className="mt-6"
            >
                {t(existsId ? "update" : "create")}
            </Button>
        </form>
    );
};
