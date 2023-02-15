import styles from "./PokeDexPopup.module.sass";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
export default function PokeDexPopup({
    pokemon
}: {
    pokemon: any
}) {
    return (
        <>
            <AnimatePresence>
                {pokemon && <motion.div>
                    <div className={styles.background}>
                        <div className={styles.popup}>
                            <Image src={`/pokemon/${pokemon.pokemon_name.toLowerCase().replace(/ /g, "_")}.png`} alt={`${pokemon.primary_color} pokemon its shape is a ${pokemon.shape}.`} width={150} height={150} />
                        </div>
                    </div>
                </motion.div>}
            </AnimatePresence>
        </>
    )
}