import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { taskService, ITaskResponse } from "@/shared/api/api-task";

export const useTasks = () => {
    const { data } = useQuery({
        queryKey: ["task"],
        queryFn: () => taskService.get()
    });

    const [items, setItems] = useState<ITaskResponse[] | undefined>(data);

    useEffect(() => {
        setItems(data);
    }, [data]);

    return { items, setItems };
};
