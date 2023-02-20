import styles from "./PokeDexCard.module.sass";
import Image from "next/image";
import { m } from 'framer-motion'
import { pokemonProps } from "@/types";

export default function PokeDexCard({
    pokemon,
    onClick = (pokemon: pokemonProps) => { return pokemon }
}: {
    pokemon: pokemonProps,
    onClick: (pokemon: pokemonProps) => {}
}) {
    return (
        <m.div className={styles.pokecard} onClick={() => { onClick(pokemon) }}
            tabIndex={0}
            initial={{ opacity: .6, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            exit={{ opacity: .6, x: 25 }}
            transition={{ type: "spring", stiffness: 100, duration: .5 }}
            whileHover={{
                scale: 1.05,
                transition: { duration: .5 },
                y: -10
            }}
            id={pokemon.pokemon_name + "-card"}
        >
            <Image src={`/pokemon/${pokemon.pokemon_name.toLowerCase().replace(/ /g, "_")}.png`} alt={`${pokemon.primary_color} pokemon its shape is a ${pokemon.shape}.`} width={150} height={150} />
            <div className={styles.info}>
                <h6>#{pokemon.pokedex_number}</h6>
                <h3>{pokemon.pokemon_name}</h3>
                <p className={styles.tags}><span className={`${pokemon.type_1} ${styles.tag}`}>{pokemon.type_1}</span> {pokemon.type_2 && <span className={`${pokemon.type_2} ${styles.tag}`}>{pokemon.type_2}</span>}</p>
            </div>
        </m.div>
    )
}