import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps {
    children?: React.ReactNode;
    className?: string;
    buttonProps?: ButtonHTMLAttributes<HTMLButtonElement>;
}

export const Button = ({ children, className, buttonProps }: ButtonProps) => {
    return (
        <button
            {...buttonProps}
            className={clsx(
                className,
                "border-2 text-primary/70 font-bold text-md border-primary/50 rounded-2xl px-4 py-2 button-3d transition"
            )}
        >
            {children}
        </button>
    );
};
