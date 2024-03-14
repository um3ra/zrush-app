"use client";

import clsx from "clsx";

import { Badge } from "./Badge";

import { useOutside } from "@/shared/lib/hooks/useOutside";
import { WrapperWithReset } from "..";
import { useTranslations } from "next-intl";

export interface IOption {
    label: string;
    value: string;
}

interface ISingleSelect {
    data: IOption[];
    onChange: (value: string) => void;
    value: string;
    isColorSelect?: boolean;
}

export function SingleSelect({
    data,
    onChange,
    value,
    isColorSelect
}: ISingleSelect) {
    const { isShow, setIsShow, ref } = useOutside<HTMLDivElement>(false);
    const getValue = () => data.find((item) => item.value === value)?.value;
    const t = useTranslations("Select");

    return (
        <WrapperWithReset
            isShow={!!value}
            onReset={() => {
                onChange("");
            }}
            className={clsx("min-w-36", {
                "w-max": isColorSelect
            })}
            ref={ref}
        >
            <button
                onClick={(e) => {
                    e.preventDefault();
                    setIsShow(!isShow);
                }}
            >
                {getValue() ? (
                    <Badge
                        variant={value}
                        className="capitalize"
                        style={isColorSelect ? { backgroundColor: value } : {}}
                    >
                        {getValue()}
                    </Badge>
                ) : (
                    <Badge>{t("click-for-select")}</Badge>
                )}
            </button>

            {isShow && (
                <div
                    className={clsx(
                        "absolute w-full p-2.5 left-0 slide bg-sidebar z-[200] shadow bg-stone-500 shadow-primary rounded-lg"
                    )}
                    style={{
                        top: "calc(100% + .5rem)"
                    }}
                >
                    {data.map((item) => (
                        <button
                            key={item.value}
                            onClick={(e) => {
                                e.preventDefault();
                                onChange(item.value);
                                setIsShow(false);
                            }}
                            className="block mb-4 last:mb-0 capitalize rounded-lg"
                            style={
                                isColorSelect
                                    ? {
                                          backgroundColor: item.value
                                      }
                                    : {}
                            }
                        >
                            <Badge variant={item.value}>{item.label}</Badge>
                        </button>
                    ))}
                </div>
            )}
        </WrapperWithReset>
    );
}
