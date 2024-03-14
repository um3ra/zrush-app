import { Link } from "@/shared/lib/locales/navigation";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { IMenuItem } from "./menu.types";

export const MenuItem = ({
    item,
    isActive
}: {
    item: IMenuItem;
    isActive: boolean;
}) => {
    const t = useTranslations("Sidebar");

    return (
        <div>
            <Link
                className="text-primary relative flex gap-2 rounded-md items-center box-border transition py-2"
                href={item.link}
            >
                <item.icon />
                <span>{t(item.name as any)}</span>
                <span
                    className={clsx(
                        "absolute h-[2px] bg-secondary bottom-0 transition",
                        isActive ? "w-full" : "w-0"
                    )}
                ></span>
            </Link>
        </div>
    );
};
