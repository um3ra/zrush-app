import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import { ITaskResponse } from "@/shared/api/api-task";
import dayjs from "dayjs";
import { FILTERS } from "./columns.data";

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

export const filterTasks = (
    tasks: ITaskResponse[] | undefined,
    value: string
) => {
    switch (value) {
        case "old":
            return tasks?.filter(
                (item) =>
                    dayjs(item.createdAt).isSameOrBefore(FILTERS.old, "day") &&
                    !item.isCompleted
            );

        case "today":
            return tasks?.filter(
                (item) =>
                    dayjs(item.createdAt).isSame(FILTERS.today, "day") &&
                    !item.isCompleted
            );

        case "tomorrow":
            return tasks?.filter(
                (item) =>
                    dayjs(item.createdAt).isSame(FILTERS.tomorrow, "day") &&
                    !item.isCompleted
            );

        case "on-this-week":
            return tasks?.filter(
                (item) =>
                    !dayjs(item.createdAt).isSameOrBefore(FILTERS.tomorrow) &&
                    dayjs(item.createdAt).isSameOrBefore(
                        FILTERS["on-this-week"]
                    ) &&
                    !item.isCompleted
            );
        case "on-next-week":
            return tasks?.filter(
                (item) =>
                    dayjs(item.createdAt).isAfter(FILTERS["on-this-week"]) &&
                    dayjs(item.createdAt).isSameOrBefore(
                        FILTERS["on-next-week"]
                    ) &&
                    !item.isCompleted
            );

        case "later":
            return tasks?.filter(
                (item) =>
                    (dayjs(item.createdAt).isAfter(FILTERS["on-next-week"]) ||
                        !item.createdAt) &&
                    !item.isCompleted
            );
        case "completed":
            return tasks?.filter(
                (item) =>
                    item.isCompleted &&
                    !dayjs(item.createdAt).isBefore(
                        dayjs().startOf("day").subtract(1, "week")
                    )
            );

        default:
            return [];
    }
};
