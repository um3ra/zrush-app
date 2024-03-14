import { Draggable, Droppable } from "@hello-pangea/dnd";
import type { Dispatch, SetStateAction } from "react";

import type { ITaskResponse } from "@/shared/api/api-task";
import { FILTERS } from "@/entities/task/lib/columns.data";
import { filterTasks } from "@/entities/task/lib/filter-tasks";
import { KanbanCard } from "./KanbanCard";
import { AddTask } from "../AddTask";

interface IKanbanColumn {
    value: string;
    label: string;
    items: ITaskResponse[] | undefined;
    setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>;
}

export function KanbanColumn({ value, items, label, setItems }: IKanbanColumn) {
    return (
        <Droppable droppableId={value}>
            {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                    <div className="w-[19rem] whitespace-nowrap min-h-[79vh]">
                        <div>{label}</div>

                        {filterTasks(items, value)?.map((item, index) => (
                            <Draggable
                                key={item.id}
                                draggableId={item.id || index + ""}
                                index={index}
                            >
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                    >
                                        <KanbanCard
                                            buttonProps={{
                                                ...provided.dragHandleProps
                                            }}
                                            key={item.id}
                                            item={item}
                                            setItems={setItems}
                                        />
                                    </div>
                                )}
                            </Draggable>
                        ))}

                        {provided.placeholder}

                        {value !== "completed" &&
                            value !== "old" &&
                            !items?.some((item) => !item.id) && (
                                <AddTask
                                    className="mt-5"
                                    setItems={setItems}
                                    filterDate={
                                        FILTERS[value]
                                            ? FILTERS[value].format()
                                            : undefined
                                    }
                                />
                            )}
                    </div>
                </div>
            )}
        </Droppable>
    );
}
