import styles from "./Button.module.sass";

export default function Button({
    children,
    onClick,
    type,
}: {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    type?: 'submit' | 'reset' | 'button';
}) {
    return (
        <button
            onClick={onClick}
            type={type}
            className={styles.Button}
        >
            {children}
        </button>
    )
}