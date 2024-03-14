import { NO_INDEX_PAGE } from "@/app/constants/seo.constants";
import { Metadata } from "next";
import { Statistics } from "./Statistics";

export const metadata: Metadata = {
    title: "Dashboard",
    ...NO_INDEX_PAGE
};

const Page = () => {
    return <Statistics />;
};

export default Page;
