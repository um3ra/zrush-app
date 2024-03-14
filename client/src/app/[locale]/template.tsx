"use client";

import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            initial={{
                scale: 0.7,
                opacity: 0
            }}
            animate={{
                scale: 1,
                opacity: 1
            }}
            transition={{ duration: 0.5 }}
        >
            {children}
        </motion.div>
    );
}
