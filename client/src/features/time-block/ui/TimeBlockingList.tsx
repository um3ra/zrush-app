import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import { Loader } from "@/shared/ui";
import {
    useTimeBlocks,
    useTimeBlockDnd
} from "@/entities/time-block/lib/hooks";
import { TimeBlock } from "./TimeBlock";
import { calcHoursLeft } from "@/entities/time-block/lib/calc-hours-left";
import { useTranslations } from "next-intl";

export function TimeBlockingList() {
    const { items, setItems, isLoading } = useTimeBlocks();
    const { onDragEnd } = useTimeBlockDnd(items, setItems);
    const { hoursLeft } = calcHoursLeft(items);
    const t = useTranslations("Time-management");

    if (isLoading) return <Loader />;

    return (
        <div>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="time-block-droppable">
                    {(provided, snapshot) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {items?.length ? (
                                items?.map((item, index) => (
                                    <Draggable
                                        index={index}
                                        draggableId={item.id}
                                        key={item.id}
                                    >
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.dragHandleProps}
                                                {...provided.draggableProps}
                                            >
                                                <TimeBlock
                                                    isDragging={
                                                        snapshot.isDragging
                                                    }
                                                    item={item}
                                                />
                                            </div>
                                        )}
                                    </Draggable>
                                ))
                            ) : (
                                <div>{t("add-the-first-time")}</div>
                            )}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            <div>
                {hoursLeft > 0
                    ? t("hours-out", { count: hoursLeft })
                    : t("no-hours-left")}
            </div>
        </div>
    );
}
