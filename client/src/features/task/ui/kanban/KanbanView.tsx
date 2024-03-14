"use client";

import { DragDropContext } from "@hello-pangea/dnd";

import { COLUMNS } from "@/entities/task/lib/columns.data";
import { useTaskDnd, useTasks } from "@/entities/task/lib/hooks";
import { KanbanColumn } from "./KanbanColumn";
import { useTranslations } from "next-intl";

export const KanbanView = () => {
    const { items, setItems } = useTasks();
    const { onDragEnd } = useTaskDnd();
    const t = useTranslations("Tasks");

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="grid grid-flow-col gap-8 w-full overflow-x-auto">
                {COLUMNS.map((column) => (
                    <KanbanColumn
                        key={column.value}
                        value={column.value}
                        label={t(column.value as any)}
                        items={items}
                        setItems={setItems}
                    />
                ))}
            </div>
        </DragDropContext>
    );
};
