
import styles from "@/styles/PokeDex.module.scss"
import PokeDexData from "@/data/pokedex.json";
import { useState, useEffect } from "react";
import Image from "next/image";
import Head from "next/head";
import NavBar from "@/components/NavBar";

export default function PokeDex({

}) {
    const [SortedDex, setSorted] = useState([])
    const FilterPokemon = async () => {
        let pokedex: any = [];
        PokeDexData.filter((pokemon: any, i: number) => {
            if (pokemon.is_default) {
                pokedex.push({ ...pokemon })
            }
        })
        setSorted(pokedex)
    }
    useEffect(() => {
        FilterPokemon()
    }, [])

    return (
        <>
            <Head>
                <title>PokéDex | PokéGuess</title>
            </Head>
            <NavBar/>
            <main className={styles.main}>
                <h1>PokéDex</h1>
                <div className={styles.grid}>
                    {SortedDex && SortedDex.map((pokemon: any, i: number) => (
                        <div key={i}>
                            <h4>{pokemon.pokemon_name}</h4>
                            <Image src={`/pokemon/${pokemon.pokemon_name.toLowerCase().replace(/ /g, "_")}.png`} alt={`${pokemon.primary_color} pokemon its shape is a ${pokemon.shape}.`} width={25} height={25} />
                        </div>
                    ))
                    }
                </div>
            </main>
        </>
    )
}