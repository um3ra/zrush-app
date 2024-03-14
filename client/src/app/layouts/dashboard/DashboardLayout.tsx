import { Loader } from "@/shared/ui";
import { SideBar } from "@/widgets/sidebar/SideBar";

export const DashboardLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
        <div className="min-h-screen flex">
            <SideBar />
            <main className="w-full h-screen overflow-y-scroll main-scrollbar px-16">
                {children}
            </main>
        </div>
    );
};
