import { MotionProps } from "framer-motion";

export const switchAnimation: MotionProps = {
    transition: {
        type: "spring",
        stiffness: 500,
        damping: 30
    },
    layout: true
};
