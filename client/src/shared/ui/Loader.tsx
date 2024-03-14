import clsx from "clsx";
import { Clock2 } from "lucide-react";

export const Loader = ({ className }: { className?: string }) => {
    return (
        <div
            className={clsx(
                className,
                "flex-container-center min-w-full min-h-full"
            )}
        >
            <Clock2 size={64} className="animate-bounce" />
        </div>
    );
};
