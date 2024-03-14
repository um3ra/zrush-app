"use client";

import {
    SwitcherView,
    ListView,
    KanbanView,
    type TypeView
} from "@/features/task/ui";
import { useLocalStorage } from "@/shared/lib/hooks";
import { Loader } from "@/shared/ui";

export const TaskView = () => {
    const [type, setType, isLoading] = useLocalStorage<TypeView>({
        key: "view-type",
        defaultValue: "list"
    });

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div>
            <SwitcherView setType={setType} type={type} />
            {type === "list" ? <ListView /> : <KanbanView />}
        </div>
    );
};
