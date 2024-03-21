import { Metadata } from "next";
import { TimeBlocking } from "./TimeBlocking";

export const metadata: Metadata = {
    title: "Time block"
};

const Page = () => {
    return <TimeBlocking />;
};

export default Page;
