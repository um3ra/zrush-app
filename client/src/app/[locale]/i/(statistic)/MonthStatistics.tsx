"use client";

import { useTranslations } from "next-intl";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    Rectangle,
    ResponsiveContainer,
    Tooltip,
    XAxis
} from "recharts";
import { CustomTooltip } from "./CustomTooltip";
import { IWeek } from "@/shared/api/api-task/task.types";

interface StatisticItemProps {
    data: IWeek[];
    title?: string;
}

export const MonthStatistics = ({ data, title }: StatisticItemProps) => {
    const t = useTranslations("Statistic");

    return (
        <div>
            <h3 className="text-3xl my-8 font-bold">{title}</h3>
            <ResponsiveContainer
                style={{
                    backgroundColor: "hsl(var(--primary)/2%)"
                }}
                width={"100%"}
                minHeight={"40vh"}
            >
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="interval" type="category" />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar
                        opacity={0.9}
                        dataKey="allTasks"
                        name={t("all-tasks")}
                        fill="hsl(var(--accent-orange))"
                        activeBar={<Rectangle fill="pink" stroke="blue" />}
                    />
                    <Bar
                        opacity={0.9}
                        dataKey="completedTasks"
                        name={t("total-completed-tasks")}
                        fill="hsl(var(--accent-green))"
                        activeBar={<Rectangle fill="gold" stroke="purple" />}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};
