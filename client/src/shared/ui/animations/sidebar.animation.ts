import { MotionProps } from "framer-motion";

export const sidebarAnimation: MotionProps = {
    initial: {
        translateX: "-100%",
        width: "0"
    },
    animate: {
        width: "auto",
        translateX: 0,
        transition: {
            ease: "easeInOut",
            stiffness: 400,
            damping: 40,
            type: "spring"
        }
    },
    exit: {
        width: "0",
        translateX: "-100%",
        transition: {
            ease: "easeInOut",
            stiffness: 400,
            damping: 40,
            type: "spring"
        }
    },
    variants: {
        open: { width: "auto" },
        closed: { width: "0" }
    }
};
