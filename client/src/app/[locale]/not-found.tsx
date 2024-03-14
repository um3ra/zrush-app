import { useTranslations } from "next-intl";
import Link from "next/link";

const NotFound = () => {
    const t = useTranslations("Not-Found");

    return (
        <div className="flex-container-center flex-col">
            <div className="text-4xl">404</div>
            <div className="text-2xl font-bold my-3">{t("title")}</div>
            <Link href={"/"}>
                {"<-"}
                {t("redirect")}
            </Link>
        </div>
    );
};

export default NotFound;
