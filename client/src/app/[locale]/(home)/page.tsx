import { Metadata } from "next";
import { Home } from "./Home";

export const metadata: Metadata = {
    title: "Home"
};

const Page = () => {
    return <Home />;
};

export default Page;
