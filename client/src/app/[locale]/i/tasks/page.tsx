import { TaskView } from "@/widgets/task-view/TaskView";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Tasks"
};

const Page = () => {
    return <TaskView />;
};

export default Page;
