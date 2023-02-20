import Image from "next/image"
import styles from './Pokemon.module.sass';
import Lottie from "lottie-react";
import Pokeball from "@/public/pokeball-loading.json";
import { pokemonProps } from "@/types";

export default function PokeCard({
    Pokemon,
    TLSquare,
    TRSquare,
    BLSquare,
    BRSquare,
    Darken,
    Blur,
    onChange,
    value,
    onKeyDown,
    disabled,
}: {
    Pokemon: pokemonProps;
    TLSquare: boolean;
    TRSquare: boolean;
    BLSquare: boolean;
    BRSquare: boolean;
    Darken: boolean;
    Blur: boolean;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    value: string | number | readonly string[] | undefined;
    onKeyDown: React.KeyboardEventHandler<HTMLInputElement>;
    disabled: boolean
}) {
    return (
        <>
            <h1 className={styles.header}>Who&apos;s That Pokémon?</h1>
            {Pokemon ?
                <div className={styles.pokecard}>
                    {TLSquare && <div className={`${styles.square} ${styles.topleft}`}> </div>}
                    {TRSquare && <div className={`${styles.square} ${styles.topright}`}> </div>}
                    {BLSquare && <div className={`${styles.square} ${styles.bottomleft}`}> </div>}
                    {BRSquare && <div className={`${styles.square} ${styles.bottomright}`}> </div>}
                    <Image className={`${Darken && styles.darken} ${Blur && styles.blur25}`} src={`/pokemon/${Pokemon.pokemon_name.toLowerCase().replace(/ /g, "_")}.png`} alt={`${Pokemon.primary_color} pokemon its shape is a ${Pokemon.shape}.`} width={275} height={275} />
                </div> :
                <div className={styles.pokecard}>
                    <Lottie animationData={Pokeball} loop={true} className={styles.lottie} />
                </div>
            }
            <input placeholder={"Enter Pokémon Name"} type="string" className={styles.input} onKeyDown={onKeyDown} onChange={onChange} value={value} disabled={disabled} />
        </>
    )
}