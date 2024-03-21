import {
    Legend,
    PolarAngleAxis,
    PolarGrid,
    Radar,
    RadarChart,
    Tooltip
} from "recharts";
import { useTranslations } from "next-intl";
import { Days } from "@/shared/lib/day.data";

export const DayStatistics = ({ data }: { data: Record<string, number> }) => {
    const t = useTranslations("Statistic");
    const dayStat: { name: string; value: number }[] = [];
    for (const key in Days) {
        dayStat.push({ name: t(key as any), value: data[key] ? data[key] : 0 });
    }

    return (
        <div className="text-center border rounded-xl border-primary/20 p-5">
            <h3 className="text-2xl font-bold text-primary">
                {t("daily-efficiency")}
            </h3>
            <div className="mx-auto">
                <RadarChart
                    outerRadius={120}
                    width={400}
                    height={300}
                    data={dayStat}
                >
                    <PolarGrid />
                    <PolarAngleAxis dataKey="name" />
                    <Radar
                        name={t("completed")}
                        dataKey="value"
                        stroke="hsl(var(--accent-green)"
                        fill="hsl(var(--accent-green)/30%)"
                    />
                    <Legend />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: "hsl(var(--background)/90%)",
                            border: "2px solid hsl(var(--primary))",
                            borderRadius: "5px"
                        }}
                    />
                </RadarChart>
            </div>
        </div>
    );
};
