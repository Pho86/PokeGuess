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
            <div className={styles.background} >

                <div className={styles.popup}>
                    <button onClick={onExit}>EXIT</button>
                    {children}
                </div>
            </div>
        </>
    )
}