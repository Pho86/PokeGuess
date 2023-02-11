import styles from "./Select.module.scss";

export default function Select({
    onChange,
    checked,
    name,
}: {
    name: string;
    checked: boolean;
    onChange?: (event?: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
}) {

    return (

        <div className={styles.select}>
            <label>{name}</label>
            <input type="checkbox" name={name} checked={checked} onChange={onChange} />
        </div>
    )
}