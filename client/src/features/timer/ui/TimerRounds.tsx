import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./TimerRounds.module.css";
import { useTimerStore } from "@/entities/timer/model/store";

interface IPomodoroRounds {
    nextRoundHandler: () => void;
    prevRoundHandler: () => void;
}

export const TimerRounds = ({
    nextRoundHandler,
    prevRoundHandler
}: IPomodoroRounds) => {
    const rounds = useTimerStore((state) => state.rounds);
    const activeRound = useTimerStore((state) => state.activeRound);
    const isBreakTime = useTimerStore((state) => state.isBreakTime);

    const isCanPrevRound = rounds
        ? rounds.some((round) => round.isCompleted)
        : false;
    const isCanNextRound = rounds
        ? !rounds[rounds.length - 2]?.isCompleted
        : false;

    return (
        <div className={styles.container}>
            <button
                className={styles.button}
                disabled={!isCanPrevRound}
                onClick={() => (isCanPrevRound ? prevRoundHandler() : false)}
            >
                <ChevronLeft size={23} />
            </button>
            <div className={styles.roundsContainer}>
                {rounds &&
                    rounds.map((round, index) => (
                        <div
                            key={index}
                            className={clsx(styles.round, {
                                [styles.completed]: round.isCompleted,
                                [styles.breakTime]: isBreakTime,
                                [styles.active]:
                                    round.id === activeRound?.id &&
                                    !round.isCompleted
                            })}
                        />
                    ))}
            </div>
            <button
                className={styles.button}
                disabled={!isCanNextRound}
                onClick={() => (isCanNextRound ? nextRoundHandler() : false)}
            >
                <ChevronRight size={23} />
            </button>
        </div>
    );
};
