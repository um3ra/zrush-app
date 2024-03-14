import clsx from "clsx";
import { type InputHTMLAttributes, PropsWithRef } from "react";

interface TransparentFieldProps {
    className?: string;
    inputProps?: PropsWithRef<InputHTMLAttributes<HTMLInputElement>>;
}

export const TransparentField = ({
    className,
    inputProps
}: TransparentFieldProps) => {
    return (
        <input
            {...inputProps}
            className={clsx(
                "bg-transparent border-none focus:outline-0 focus:shadow-transparent w-full",
                className
            )}
        />
    );
};
