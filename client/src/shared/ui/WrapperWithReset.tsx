import clsx from "clsx";
import { X } from "lucide-react";
import { forwardRef, type ReactNode } from "react";

interface WrapperWithResetProps {
    isShow: boolean;
    onReset: () => void;
    children: ReactNode;
    className?: string;
}

export const WrapperWithReset = forwardRef<
    HTMLDivElement,
    WrapperWithResetProps
>(({ children, onReset, isShow, className }, ref) => {
    return (
        <div ref={ref} className={clsx(className, "relative")}>
            {children}
            {isShow && (
                <button
                    className="absolute -top-[0.6rem] opacity-50 hover:opacity-100 transition-opacity"
                    onClick={onReset}
                >
                    <X strokeWidth={3} size={14} />
                </button>
            )}
        </div>
    );
});

WrapperWithReset.displayName = "wrapperWithReset";
