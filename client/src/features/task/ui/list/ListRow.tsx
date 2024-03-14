import {
    Checkbox,
    DatePicker,
    SingleSelect,
    TransparentField
} from "@/shared/ui";
import { GripVertical, Loader, Trash } from "lucide-react";
import {
    useEffect,
    type ButtonHTMLAttributes,
    type Dispatch,
    type SetStateAction
} from "react";
import { Controller, useForm } from "react-hook-form";

import { useDeleteTask, useTaskDebounce } from "@/entities/task/lib/hooks";
import type { ITaskResponse, TypeTaskFormState } from "@/shared/api/api-task";
import { Priority } from "../view.types";

interface IListRowProps {
    item: ITaskResponse;
    setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>;
    buttonProps?: ButtonHTMLAttributes<HTMLButtonElement>;
}

export function ListRow({ item, setItems, buttonProps }: IListRowProps) {
    const { register, control, watch, setValue, getValues, setFocus } =
        useForm<TypeTaskFormState>({
            defaultValues: {
                name: item.name,
                isCompleted: item.isCompleted,
                createdAt: item.createdAt,
                priority: item.priority
            }
        });

    useTaskDebounce({ watch, itemId: item.id });

    const { deleteTask, isDeletePending } = useDeleteTask();

    useEffect(() => {
        !item.name && setFocus("name");
    }, []);

    return (
        <div className="font-normal grid grid-cols-[1.4fr_.4fr_.4fr_.1fr] gap-5 relative">
            <div>
                <span className="inline-flex items-center gap-2.5 w-full">
                    <button {...buttonProps} aria-describedby="todo-item">
                        <GripVertical
                            className={
                                "opacity-20 transition-opacity -ml-3 -mr-1 hover:opacity-100"
                            }
                        />
                    </button>

                    <Controller
                        control={control}
                        name="isCompleted"
                        render={({ field: { value, onChange } }) => (
                            <Checkbox onChange={onChange} checked={value} />
                        )}
                    />

                    <TransparentField
                        className={
                            watch("isCompleted")
                                ? "italic line-through opacity-60"
                                : ""
                        }
                        inputProps={{
                            ...register("name"),
                            onBlur: () => {
                                !getValues()?.name &&
                                    setValue("name", "unknown");
                            }
                        }}
                    />
                </span>
            </div>
            <div>
                <Controller
                    control={control}
                    name="createdAt"
                    render={({ field: { value, onChange } }) => (
                        <DatePicker onChange={onChange} value={value || ""} />
                    )}
                />
            </div>
            <div className="capitalize">
                <Controller
                    control={control}
                    name="priority"
                    render={({ field: { value, onChange } }) => (
                        <SingleSelect
                            data={Object.values(Priority).map((item) => ({
                                value: item,
                                label: item
                            }))}
                            onChange={onChange}
                            value={value || ""}
                        />
                    )}
                />
            </div>
            <div>
                <button
                    onClick={() =>
                        item.id
                            ? deleteTask(item.id)
                            : setItems((prev) => prev?.slice(0, -1))
                    }
                    className="opacity-50 transition-opacity hover:opacity-100"
                >
                    {isDeletePending ? (
                        <Loader size={15} />
                    ) : (
                        <Trash size={15} />
                    )}
                </button>
            </div>
        </div>
    );
}
