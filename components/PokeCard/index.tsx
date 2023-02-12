import Image from "next/image"
import styles from './Pokemon.module.sass';

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
    Pokemon: any;
    TLSquare: boolean;
    TRSquare: boolean;
    BLSquare: boolean;
    BRSquare: boolean;
    Darken: boolean;
    Blur: number;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    value: string | number | readonly string[] | undefined;
    onKeyDown: React.KeyboardEventHandler<HTMLInputElement>;
    disabled: boolean
}) {
    return (
        <>
            {Pokemon ?
                <div className={styles.pokecard}>
                    {TLSquare && <div className={`${styles.square} ${styles.topleft}`}> </div>}
                    {TRSquare && <div className={`${styles.square} ${styles.topright}`}> </div>}
                    {BLSquare && <div className={`${styles.square} ${styles.bottomleft}`}> </div>}
                    {BRSquare && <div className={`${styles.square} ${styles.bottomright}`}> </div>}
                    <Image className={`${Darken && styles.darken} ${Blur === 25 && styles.blur25}`} src={`/pokemon/${Pokemon.pokemon_name.toLowerCase().replace(/ /g, "_")}.png`} alt={`${Pokemon.primary_color} pokemon its shape is a ${Pokemon.shape}.`} width={250} height={250} />
                </div> :
                <div className={styles.pokecard}>
                    <Image className={`${styles.darken}`} src={`/pokemon/unown.png`} alt={`${Pokemon.primary_color} pokemon its shape is a ${Pokemon.shape}.`} width={250} height={250} />
                </div>
            }
            <input className={styles.input} onKeyDown={onKeyDown} onChange={onChange} value={value} disabled={disabled}/>
        </>
    )
}