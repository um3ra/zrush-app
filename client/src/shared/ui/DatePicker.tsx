"use client";

import clsx from "clsx";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import { useState } from "react";
import { DayPicker, type SelectSingleEventHandler } from "react-day-picker";
import { useOutside } from "@/shared/lib/hooks";
import { WrapperWithReset } from ".";
import "react-day-picker/dist/style.css";

dayjs.extend(LocalizedFormat);

interface IDatePicker {
    onChange: (value: string) => void;
    value: string;
    position?: "left" | "right";
}

export function DatePicker({
    onChange,
    value,
    position = "right"
}: IDatePicker) {
    const [selected, setSelected] = useState<Date | undefined>(
        value ? new Date(value) : undefined
    );
    const { isShow, setIsShow, ref } = useOutside<HTMLDivElement>(false);
    const handleDaySelect: SelectSingleEventHandler = (date) => {
        const ISOdate = date?.toISOString();
        setSelected(date);
        if (ISOdate) {
            onChange(ISOdate);
            setIsShow(false);
        } else {
            onChange("");
        }
    };

    return (
        <WrapperWithReset
            isShow={!!value}
            onReset={() => onChange("")}
            ref={ref}
        >
            <button onClick={() => setIsShow(!isShow)}>
                {value ? dayjs(value).format("LL") : "Click for select"}
            </button>

            {isShow && (
                <div
                    className={clsx(
                        "absolute p-2.5 slide bg-stone-200 z-10 shadow shadow-primary rounded-lg",
                        position === "left" ? "-left-4" : " -right-4"
                    )}
                    style={{
                        top: "calc(100% + .7rem)"
                    }}
                >
                    <DayPicker
                        disabled={{ before: new Date() }}
                        className="rdp bg-white text-black"
                        showOutsideDays
                        fromYear={2024}
                        toYear={2054}
                        initialFocus={isShow}
                        mode="single"
                        defaultMonth={selected}
                        selected={selected}
                        onSelect={handleDaySelect}
                        weekStartsOn={1}
                    />
                </div>
            )}
        </WrapperWithReset>
    );
}
