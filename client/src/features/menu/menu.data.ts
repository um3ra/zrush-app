import {
    CalendarPlus2,
    KanbanSquare,
    BarChart4,
    Settings,
    TimerReset
} from "lucide-react";
import { IMenuItem } from "./menu.types";
import { DASHBOARD_PAGES } from "@/shared/config/pages-url.config";

export const MENU: IMenuItem[] = [
    {
        icon: BarChart4,
        link: DASHBOARD_PAGES.HOME,
        name: "Dashboard"
    },
    {
        icon: KanbanSquare,
        link: DASHBOARD_PAGES.TASKS,
        name: "Tasks"
    },
    {
        icon: TimerReset,
        link: DASHBOARD_PAGES.TIMER,
        name: "Timer"
    },

    {
        icon: CalendarPlus2,
        link: DASHBOARD_PAGES.TIME_BLOCKING,
        name: "Time management"
    },

    {
        icon: Settings,
        link: DASHBOARD_PAGES.SETTINGS,
        name: "Settings"
    }
];
