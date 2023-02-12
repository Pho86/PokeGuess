import styles from "./Rectangle.module.sass";

export default function Rectangle({
    active,
    onClick,
    text,
}:{
    active:boolean;
    onClick?: () => void;
    text: string
}) {
    return (
        <>
        {active ? <div onClick={onClick} className={styles.drectangle}><p>{text}</p></div> : <div onClick={onClick} className={styles.arectangle}><p>{text}</p></div> }
        </>
    )
}