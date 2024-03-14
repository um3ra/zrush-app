import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
    timeBlockService,
    type ITimeBlockResponse
} from "@/shared/api/api-time-block";

export const useTimeBlocks = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["time-blocks"],
        queryFn: () => timeBlockService.get()
    });

    const [items, setItems] = useState<ITimeBlockResponse[] | undefined>(data);

    useEffect(() => {
        setItems(data);
    }, [data]);

    return { items, setItems, isLoading };
};
