import styles from "./Checkbox.module.css";
import clsx from "clsx";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
}

export const Checkbox = ({ className, ...props }: CheckboxProps) => {
    return (
        <div className={clsx(className, styles.checkboxWrapper)}>
            <input {...props} type="checkbox" />
        </div>
    );
};
