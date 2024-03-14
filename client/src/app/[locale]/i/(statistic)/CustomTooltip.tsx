import { useTranslations } from "next-intl";
import type { TooltipProps } from "recharts";
import type {
    ValueType,
    NameType
} from "recharts/types/component/DefaultTooltipContent";

export const CustomTooltip = ({
    active,
    payload,
    label
}: TooltipProps<ValueType, NameType>) => {
    const t = useTranslations("Statistic");

    if (!active) return false;

    return (
        <div className="bg-background/90 p-3 rounded-lg h-[10rem] border-2 border-primary flex flex-col justify-center items-center">
            <div className="text-accent">
                {t("all-tasks")}: {payload?.[0].value}
            </div>
            <div className="text-accent-green">
                {t("total-completed-tasks")}: {payload?.[1].value}
            </div>
            <div>{label}</div>
        </div>
    );
};
