import styles from "./PokeDexPopup.module.sass";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
export default function PokeDexPopup({
    pokemon,
    onExit
}: {
    pokemon: any,
    onExit: () => void
}) {
    return (
        <>
            <AnimatePresence>
                {pokemon &&
                    <>
                        <div className={styles.background} onClick={onExit}> </div>
                        <div className={styles.area} >
                            <motion.div className={styles.popup}
                                initial={{ y: -250, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: 250, opacity: 0 }}
                                transition={{ duration: .45, ease: "easeInOut" }}
                            >
                                <div className={styles.col}>
                                    <Image src={`/pokemon/${pokemon.pokemon_name.toLowerCase().replace(/ /g, "_")}.png`} alt={`${pokemon.primary_color} pokemon its shape is a ${pokemon.shape}.`} width={250} height={250} />
                                </div>
                                <div className={styles.col}>
                                    <h2><span className={styles.number}>#{pokemon.pokedex_number}</span> {pokemon.pokemon_name}</h2>
                                    <p className={styles.tags}><span className={`${pokemon.type_1} ${styles.tag}`}>{pokemon.type_1}</span> {pokemon.type_2 && <span className={`${pokemon.type_2} ${styles.tag}`}>{pokemon.type_2}</span>}</p>

                                    {
                                        pokemon.female_rate * 100 === 100 ? <div className={styles.bar}><div className={`${styles.femalebar} ${styles.borderall}`} style={{ width: `${pokemon.female_rate * 100}%` }}></div></div> :

                                        pokemon.female_rate * 100 > (100 - pokemon.female_rate * 100) ? <div className={styles.bar}><div className={`${styles.femalebar} ${styles.borderright}`} style={{ width: `${pokemon.female_rate * 100}%` }}></div><div className={`${styles.malebar} ${styles.borderleft}`} style={{ width: `${100 - (pokemon.female_rate * 100)}%` }}></div> </div> :

                                        100 - (pokemon.female_rate * 100) === 100 ? <div className={styles.bar}><div className={`${styles.malebar} ${styles.borderall}`} style={{ width: `${100 - (pokemon.female_rate * 100)}%` }}></div><div className={`${styles.femalebar} ${styles.borderleft}`} style={{ width: `${pokemon.female_rate * 100}%` }}></div></div> :

                                        <div className={styles.bar}><div className={`${styles.malebar} ${styles.borderright}`} style={{ width: `${100 - (pokemon.female_rate * 100)}%` }}></div><div className={`${styles.femalebar} ${styles.borderleft}`} style={{ width: `${pokemon.female_rate * 100}%` }}></div></div>
                                    }
                                    <p className={styles.gender}><span className={styles.female}>{pokemon.female_rate * 100}% female</span> <span className={styles.male}>{100 - (pokemon.female_rate * 100)}% male</span></p>
                                    <p className={styles.abilities}>Abilities:</p>
                                    <p><span className={styles.ability}>{pokemon.ability_1}</span>{pokemon.ability_2 && <span className={styles.ability}>, {pokemon.ability_2}</span>}{pokemon.ability_3 && <span className={styles.ability}>, {pokemon.ability_3}</span>}</p>
                                    
                                </div>
                            </motion.div>
                        </div>
                    </>
                }
            </AnimatePresence>
        </>
    )
}