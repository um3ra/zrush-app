import { Dispatch, SetStateAction } from "react";
import { ITaskResponse } from "@/shared/api/api-task";
import { useTranslations } from "next-intl";

interface ListAddProps {
    className?: string;
    filterDate?: string;
    setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>;
}

export const AddTask = ({ className, filterDate, setItems }: ListAddProps) => {
    const t = useTranslations("Tasks");

    const handleClick = () => {
        setItems((prev) => {
            if (!prev) return;
            return [
                ...prev,
                {
                    id: "",
                    name: "",
                    isCompleted: false,
                    createdAt: filterDate
                }
            ];
        });
    };

    return (
        <div className={className}>
            <button
                onClick={handleClick}
                className="italic text-primary opacity-60 text-sm"
            >
                {t("add-task")}
            </button>
        </div>
    );
};
