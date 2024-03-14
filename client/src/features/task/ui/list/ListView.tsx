"use client";

import { DragDropContext } from "@hello-pangea/dnd";
import { useTasks, useTaskDnd } from "@/entities/task/lib/hooks";
import { COLUMNS } from "@/entities/task/lib/columns.data";
import { ListRowParent } from "./ListRowParent";
import { useTranslations } from "next-intl";

export const ListView = () => {
    const { items, setItems } = useTasks();
    const { onDragEnd } = useTaskDnd();
    const t = useTranslations("Tasks");

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="w-full">
                <ul className="grid grid-cols-[1.4fr_.4fr_.4fr_.1fr] rounded border-t border-border-back text-left w-auto whitespace-nowrap">
                    <li>{t("task-name")}</li>
                    <li>{t("due-date")}</li>
                    <li>{t("priority")}</li>
                    <li></li>
                </ul>

                <div>
                    {COLUMNS.map((column) => (
                        <ListRowParent
                            items={items}
                            label={t(column.value as any)}
                            value={column.value}
                            setItems={setItems}
                            key={column.value}
                        />
                    ))}
                </div>
            </div>
        </DragDropContext>
    );
};
