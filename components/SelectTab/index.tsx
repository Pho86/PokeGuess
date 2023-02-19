import styles from "./Select.module.sass";

export default function SelectTab({
    onClick,
    checked,
    name,
    side
}: {
    name: string;
    checked: boolean;
    onClick?: () => void
    side: boolean
}) {

    return (

        <div className={`${styles.select} ${checked ? styles.checked : styles.unchecked} ${side ? styles.right : styles.left}`} onClick={onClick}>
            <label>{name}</label>
            <label>{checked ? "✓" : "✗"}</label>
        </div>
    )
}