import dayjs, { type Dayjs } from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import weekOfYear from "dayjs/plugin/weekOfYear";

dayjs.extend(isoWeek);
dayjs.extend(weekOfYear);

export const COLUMNS = [
    {
        label: "Today",
        value: "today"
    },
    {
        label: "Tomorrow",
        value: "tomorrow"
    },
    {
        label: "On this week",
        value: "on-this-week"
    },
    {
        label: "On next week",
        value: "on-next-week"
    },
    {
        label: "Later",
        value: "later"
    },
    {
        label: "Completed",
        value: "completed"
    },
    {
        label: "Old",
        value: "old"
    }
];

export const FILTERS: Record<string, Dayjs> = {
    today: dayjs().startOf("day"),
    tomorrow: dayjs().add(1, "day").startOf("day"),
    "on-this-week": dayjs().add(1, "week").startOf("isoWeek"),
    "on-next-week": dayjs().add(2, "week").startOf("isoWeek"),
    later: dayjs().add(2, "week").startOf("day"),
    old: dayjs().startOf("day").subtract(1, "day")
};
