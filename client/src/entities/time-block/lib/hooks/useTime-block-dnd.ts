import {
    timeBlockService,
    type ITimeBlockResponse
} from "@/shared/api/api-time-block";
import { DropResult } from "@hello-pangea/dnd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";

export const useTimeBlockDnd = (
    items: ITimeBlockResponse[] | undefined,
    setItems: Dispatch<SetStateAction<ITimeBlockResponse[] | undefined>>
) => {
    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationKey: ["update order time block"],
        mutationFn: (ids: string[]) => timeBlockService.updateOrder({ ids }),
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ["time-blocks"] });
        }
    });

    const reorder = (
        list: typeof items,
        startIndex: number,
        endIndex: number
    ) => {
        if (!list) return;
        const [removed] = list.splice(startIndex, 1);
        list.splice(endIndex, 0, removed);

        return list;
    };

    function onDragEnd(result: DropResult) {
        if (!result.destination) {
            return;
        }

        const newItems = reorder(
            items,
            result.source.index,
            result.destination.index
        );
        setItems(newItems);
        if (!newItems) return;
        mutate(newItems.map((item) => item.id));
    }

    return { onDragEnd };
};
