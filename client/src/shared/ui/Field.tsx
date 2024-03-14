import { InputHTMLAttributes, PropsWithRef, useId } from "react";
import clsx from "clsx";

export interface FieldProps {
    className?: string;
    label?: string;
    inputProps?: PropsWithRef<InputHTMLAttributes<HTMLInputElement>>;
    errorMessage?: string;
}

export const Field = ({
    className,
    label,
    inputProps,
    errorMessage
}: FieldProps) => {
    const id = useId();
    return (
        <div className={clsx(className, "mb-2 relative")}>
            {label && (
                <div>
                    {" "}
                    <label className="text-primary/70 font-bold" htmlFor={id}>
                        {label}
                    </label>
                </div>
            )}
            <input
                {...inputProps}
                className="p-2 border-2 border-primary/50 w-full rounded-2xl bg-background focus:border-primary transition"
                id={id}
            />
            {errorMessage && (
                <span className="text-error absolute w-full top-full left-1/2 -translate-x-1/2 font-medium">
                    {errorMessage}
                </span>
            )}
        </div>
    );
};

Field.displayName = "field";
