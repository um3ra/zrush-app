import { Draggable, Droppable } from "@hello-pangea/dnd";
import type { Dispatch, SetStateAction } from "react";
import type { ITaskResponse } from "@/shared/api/api-task";
import { FILTERS } from "@/entities/task/lib/columns.data";
import { filterTasks } from "@/entities/task/lib/filter-tasks";
import { ListRow } from "./ListRow";
import { AddTask } from "../AddTask";

interface IListRowParent {
    value: string;
    label: string;
    items: ITaskResponse[] | undefined;
    setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>;
}

export function ListRowParent({
    value,
    items,
    label,
    setItems
}: IListRowParent) {
    return (
        <Droppable droppableId={value}>
            {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                    <div className="rounded border-t border-primary/20 text-left w-auto whitespace-nowrap">
                        <h3 className="text-xl leading-10 font-bold w-full border-r border-primary/25 p-4">
                            {label}
                        </h3>
                    </div>

                    {filterTasks(items, value)?.map((item, index) => (
                        <Draggable
                            isDragDisabled={!item.id}
                            key={item.id}
                            draggableId={item.id || index + ""}
                            index={index}
                        >
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                >
                                    <ListRow
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
                                className="py-2 px-4 border-t border-primary/80"
                                setItems={setItems}
                                filterDate={
                                    FILTERS[value]
                                        ? FILTERS[value].format()
                                        : undefined
                                }
                            />
                        )}
                </div>
            )}
        </Droppable>
    );
}
