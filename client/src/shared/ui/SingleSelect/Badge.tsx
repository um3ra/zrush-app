import type { CSSProperties } from "react";
import clsx from "clsx";

interface BadgeProps {
    className?: string;
    variant?: string;
    style?: CSSProperties;
    children?: React.ReactNode;
}

export function Badge({
    children,
    className,
    variant = "NONE",
    style
}: BadgeProps) {
    return (
        <span
            className={clsx(
                className,
                "rounded-lg w-max py-1 px-2 text-xs font-semibold text-white transition",
                {
                    LOW: "bg-lime-600",
                    MEDIUM: "bg-amber-500",
                    HIGH: "bg-orange-600",
                    NONE: "bg-stone-500"
                }[variant]
            )}
            style={style}
        >
            {children}
        </span>
    );
}
