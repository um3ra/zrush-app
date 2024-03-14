import clsx from "clsx";
import { GripVertical, Loader, Trash } from "lucide-react";
import {
    useEffect,
    type ButtonHTMLAttributes,
    type Dispatch,
    type SetStateAction
} from "react";
import { Controller, useForm } from "react-hook-form";
import {
    Checkbox,
    TransparentField,
    SingleSelect,
    DatePicker
} from "@/shared/ui";
import { Priority } from "../view.types";
import type { ITaskResponse, TypeTaskFormState } from "@/shared/api/api-task";
import { useDeleteTask, useTaskDebounce } from "@/entities/task/lib/hooks";

interface IKanbanCard {
    item: ITaskResponse;
    setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>;
    buttonProps?: ButtonHTMLAttributes<HTMLButtonElement>;
}

export function KanbanCard({ item, setItems, buttonProps }: IKanbanCard) {
    const { register, control, watch, getValues, setValue, setFocus } =
        useForm<TypeTaskFormState>({
            defaultValues: {
                name: item.name,
                isCompleted: item.isCompleted,
                createdAt: item.createdAt,
                priority: item.priority
            }
        });
    useEffect(() => {
        !item.name && setFocus("name");
    }, []);

    useTaskDebounce({ watch, itemId: item.id });

    const { deleteTask, isDeletePending } = useDeleteTask();

    return (
        <div
            className={clsx(
                "rounded border border-primary shadow shadow-primary/60 mt-5 p-4 relative bg-background",
                {
                    "italic line-through opacity-50": watch("isCompleted")
                },
                "animation-opacity"
            )}
        >
            <div className="flex items-center mb-2 text-[93%]">
                <button {...buttonProps} aria-describedby="todo-item">
                    <GripVertical className="opacity-20 transition-opacity -ml-1 -mr-0.5 absolute top-2 right-1.5 hover:opacity-100 active:opacity-100" />
                </button>

                <Controller
                    control={control}
                    name="isCompleted"
                    render={({ field: { value, onChange } }) => (
                        <Checkbox onChange={onChange} checked={value} />
                    )}
                />

                <TransparentField
                    className="ml-2"
                    inputProps={{
                        ...register("name"),
                        onBlur: () => {
                            !getValues()?.name && setValue("name", "unknown");
                        }
                    }}
                />
            </div>

            <div className="text-[83%] flex gap-5 mt-5">
                <Controller
                    control={control}
                    name="createdAt"
                    render={({ field: { value, onChange } }) => (
                        <DatePicker
                            onChange={onChange}
                            value={value || ""}
                            position="left"
                        />
                    )}
                />

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

            <div className="absolute bottom-1 right-1.5 opacity-40">
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
