import { Edit, GripVertical, Loader, Trash } from "lucide-react";
import { useFormContext } from "react-hook-form";
import type {
    ITimeBlockResponse,
    TypeTimeBlockFormState
} from "@/shared/api/api-time-block";
import { useDeleteTimeBlock } from "@/entities/time-block/lib/hooks";
import clsx from "clsx";

export function TimeBlock({
    item,
    isDragging
}: {
    item: ITimeBlockResponse;
    isDragging?: boolean;
}) {
    const { reset } = useFormContext<TypeTimeBlockFormState>();
    const { deleteTimeBlock, isDeletePending } = useDeleteTimeBlock(item.id);

    return (
        <div>
            <div
                className={clsx(
                    "border border-primary rounded p-4 relative flex items-center justify-between text-sm transition",
                    isDragging && "scale-[1.05] shadow-md shadow-primary/60"
                )}
                style={{
                    backgroundColor: item.color || "lightgray",
                    height: `${item.duration}px`
                }}
            >
                <div className="flex items-center">
                    <button aria-describedby="time-block">
                        <GripVertical />
                    </button>
                    <div>
                        {item.name}{" "}
                        <i className="text-xs text-primary/70">
                            ({item.duration} min.)
                        </i>
                    </div>
                </div>

                <div>
                    <button
                        onClick={() => {
                            reset({
                                id: item.id,
                                color: item.color,
                                duration: item.duration,
                                name: item.name,
                                order: item.order
                            });
                        }}
                        className="opacity-50 transition-opacity hover:opacity-100 mr-2"
                    >
                        <Edit size={16} />
                    </button>
                    <button
                        onClick={() => deleteTimeBlock()}
                        className="opacity-50 transition-opacity hover:opacity-100"
                    >
                        {isDeletePending ? (
                            <Loader size={16} />
                        ) : (
                            <Trash size={16} />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
