import styles from "./Button.module.sass";

export default function Button({
    children,
    onClick,
    type,
    disabled = false,
}: {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    type?: 'submit' | 'reset' | 'button';
    disabled? : boolean
}) {
    return (
        <button
            onClick={onClick}
            type={type}
            className={styles.Button}
            disabled={disabled}
        >
            <span>{children}</span>
        </button>
    )
}