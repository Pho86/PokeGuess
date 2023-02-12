import styles from "./ScorePopup.module.scss";

export default function Popup({
    children,
    onExit

}: {
    children: React.ReactNode;
    onExit: () => void;
}) {
    return (
        <>
            <div className={styles.background} onClick={onExit}>

                <div className={styles.popup}>
                    {children}
                </div>
            </div>
        </>
    )
}