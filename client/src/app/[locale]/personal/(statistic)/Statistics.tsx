"use client";

import { taskService } from "@/shared/api/api-task";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { MonthStatistics } from "./MonthStatistics";
import { DayStatistics } from "./DayStatistics";
import { Loader } from "@/shared/ui";

export const Statistics = () => {
    const t = useTranslations("Statistic");

    const { data } = useQuery({
        queryFn: () => taskService.getStatistics(),
        queryKey: ["statistics"]
    });

    if (!data) return <Loader />;

    return (
        <div className="py-12 flex flex-col justify-between min-h-screen">
            <div className="flex flex-col md:flex-row justify-between items-center">
                <div>
                    <h3 className="text-3xl my-8 font-bold">{t("all-time")}</h3>
                    <div>
                        {t("all-tasks")}: {data.totalTasks}
                    </div>
                    <div>
                        {t("total-completed-tasks")}: {data.totalCompletedTasks}
                    </div>
                </div>
                <DayStatistics data={data.dayStat} />
            </div>
            <MonthStatistics
                title={t("current-month")}
                data={data.currentMonth}
            />
        </div>
    );
};
