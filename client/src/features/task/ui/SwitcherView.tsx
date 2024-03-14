"use client";

import clsx from "clsx";
import { Kanban, ListTodo } from "lucide-react";
import type { TypeView } from "./view.types";
import { useTranslations } from "next-intl";

interface ISwitcherView {
    type: TypeView;
    setType: (value: TypeView) => void;
}

export function SwitcherView({ setType, type }: ISwitcherView) {
    const t = useTranslations("Tasks");

    return (
        <div className="flex bg-background my-6 gap-4">
            <button
                className={clsx("flex items-center gap-1", {
                    "opacity-40": type === "kanban"
                })}
                onClick={() => setType("list")}
            >
                <ListTodo />
                {t("list")}
            </button>
            <button
                className={clsx("flex items-center gap-1", {
                    "opacity-40": type === "list"
                })}
                onClick={() => setType("kanban")}
            >
                <Kanban />
                {t("board")}
            </button>
        </div>
    );
}
