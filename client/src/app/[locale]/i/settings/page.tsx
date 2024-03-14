import { Metadata } from "next";
import { Settings } from "./Settings";

export const metadata: Metadata = {
    title: "Settings"
};

const Page = () => {
    return (
        <div className="flex-container-center">
            <Settings />
        </div>
    );
};

export default Page;
