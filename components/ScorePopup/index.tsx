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

                <div className={styles.popup_area}>
                    <button className={styles.button} onClick={onExit}>✗</button>
                    <div className={styles.popup}>
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}