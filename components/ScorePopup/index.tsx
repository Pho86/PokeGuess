import styles from "./ScorePopup.module.sass";
import { m, AnimatePresence } from "framer-motion";

export default function Popup({
    children,
    onExit,
    show

}: {
    children: React.ReactNode;
    onExit: () => void;
    show: boolean
}) {
    return (
        <AnimatePresence>
            {show && <div className={styles.background} >

                <m.div className={styles.popup_area} 
                initial={{y:-150, opacity: 0}}
                animate={{y:0, opacity: 1}}
                exit={{y:200, opacity: 0}}
                >
                    <button className={styles.button} onClick={onExit}>✗</button>
                    <div className={styles.popup}>
                        {children}
                    </div>
                </m.div>
            </div> }
        </AnimatePresence>
    )
}