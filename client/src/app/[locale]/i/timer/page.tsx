import { Timer } from "@/features/timer/ui";
import { Metadata } from "next";
import clsx from "clsx";

export const metadata: Metadata = {
    title: "Timer"
};

const Page = () => {
    return (
        <div className={clsx("flex-container-center")}>
            <Timer />
        </div>
    );
};

export default Page;
