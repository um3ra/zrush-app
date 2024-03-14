import { getDay } from "date-fns";

export const dayNameFormat = (date: Date) => {
    switch (getDay(date)) {
        case 1:
            return "monday";
        case 2:
            return "tuesday";
        case 3:
            return "wednesday";
        case 4:
            return "thursday";
        case 5:
            return "friday";
        case 6:
            return "saturday";
        case 0:
            return "sunday";
    }
};
