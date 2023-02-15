import styles from "@/styles/PokeDex.module.scss"
import PokeDexData from "@/data/pokedex.json";
import { useState, useEffect } from "react";
import Image from "next/image";
import Head from "next/head";
import NavBar from "@/components/NavBar";
import PokeDexCard from "@/components/PokeDexCard";
import PokeDexPopup from "@/components/PokeDexPopup";

export default function PokeDex({

}) {
    const [SortedDex, setSorted] = useState([]);
    const [OpenCard, setOpenCard] = useState("" as any)
    const FilterPokemon = async () => {
        let pokedex: any = [];
        PokeDexData.filter((pokemon: any, i: number) => {
            if (pokemon.is_default) {
                pokedex.push({ ...pokemon })
            }
        })
        setSorted(pokedex)
    }
    const openCard = async (pokemon: any) => {
        setOpenCard(pokemon)
        console.log(pokemon)
    }
    useEffect(() => {
        FilterPokemon()
        console.log(SortedDex)
    }, [])

    return (
        <>
            <Head>
                <title>PokéDex | PokéGuess</title>
            </Head>
            <NavBar active={2} />
            <main className={styles.main}>
                <h1>PokéDex</h1>
                <div className={styles.grid}>
                    {SortedDex && SortedDex.map((pokemon: any, i: number) => (
                        <PokeDexCard onClick={openCard} pokemon={pokemon} key={i} />
                    ))
                    }
                </div>
                <PokeDexPopup pokemon={OpenCard} />
            </main>
        </>
    )
}