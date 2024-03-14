"use client";

import { Pause, Play, RefreshCcw, X } from "lucide-react";
import { Button } from "@/shared/ui/Button";
import { formatTime } from "@/entities/timer/lib/formatTime";
import { useCreateSession, useTimer } from "@/entities/timer/lib/hooks";
import { TimerRounds } from "./TimerRounds";
import { Loader } from "@/shared/ui";
import { useTimerStore } from "@/entities/timer/model/store";
import { useTranslations } from "next-intl";
import clsx from "clsx";

export const Timer = () => {
    const timerState = useTimer();
    const isBreakTime = useTimerStore((state) => state.isBreakTime);
    const { isPending, mutate } = useCreateSession();
    const translate = useTranslations("Timer");

    if (timerState.sessionLoading) {
        return <Loader />;
    }

    return (
        <div className="relative w-80 p-9 min-h-[15rem] text-center border-2 border-primary rounded-xl overflow-hidden">
            <span className="bg-background rounded-full h-6 w-6 border-2 border-primary absolute z-[200] top-2 left-2 flex items-center justify-center text-primary">
                <X />
            </span>
            <span className="bg-background rounded-full h-6 w-6 border-2 border-primary absolute z-[200] bottom-2 left-2 flex items-center justify-center text-primary">
                <X />
            </span>
            <span className="bg-background rounded-full h-6 w-6 border-2 border-primary absolute z-[200] bottom-2 right-2 flex items-center justify-center text-primary">
                <X />
            </span>
            <span className="bg-background rounded-full h-6 w-6 border-2 border-primary absolute z-[200] top-2 right-2 flex items-center justify-center text-primary">
                <X />
            </span>

            <div
                className={clsx(
                    "absolute top-0 left-0 h-full transition",
                    isBreakTime ? "bg-accent/50" : "bg-accent-green/50"
                )}
                style={timerState.progressStyle()}
            />
            <div className="relative bg-background border-2 border-primary flex flex-col justify-center items-center min-h-[14rem] z-20">
                {timerState.session ? (
                    <>
                        <div className="text-7xl font-semibold timerTitle">
                            {formatTime(timerState.secondsLeft)}
                        </div>
                        <TimerRounds
                            nextRoundHandler={timerState.next}
                            prevRoundHandler={timerState.prev}
                        />
                        <button
                            className="mt-6 opacity-80 hover:opacity-100 transition-opacity"
                            onClick={
                                timerState.isRunning
                                    ? timerState.pause
                                    : timerState.play
                            }
                            disabled={timerState.isUpdate}
                        >
                            {timerState.isRunning ? (
                                <Pause size={35} />
                            ) : (
                                <Play size={35} />
                            )}
                        </button>
                        <button
                            onClick={() => {
                                timerState.reset();
                            }}
                            className="absolute top-2 right-2 opacity-40 hover:opacity-90 transition-opacity"
                        >
                            <RefreshCcw size={19} />
                        </button>

                        {isBreakTime && (
                            <div className="animate-pulse text-xl font-medium absolute left-1/2 -translate-x-1/2 bottom-0 text-primary">
                                Break
                            </div>
                        )}
                    </>
                ) : (
                    <Button
                        buttonProps={{
                            onClick: () => mutate(),
                            disabled: isPending
                        }}
                        className="mt-2"
                    >
                        {translate("create_session")}
                    </Button>
                )}
            </div>
        </div>
    );
};
