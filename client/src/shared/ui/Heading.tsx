export const Heading = ({ title }: { title: string }) => {
    return (
        <div className="my-5 w-full">
            <h1 className="flex flex-col text-secondary items-end text-3xl w-1/4">
                {title}
            </h1>
            <div className="h-2 border-secondary border-b-2"></div>
        </div>
    );
};
