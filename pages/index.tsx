import Head from 'next/head';
import Image from 'next/image';
import { DetailedHTMLProps } from 'react';
import PokeDex from "@/data/pokedex.json";
import { useState, useEffect } from 'react';
import styles from "@/styles/home.module.scss";
import { selectRandomFromArray, generateRandomNumber } from "@/util";
import Select from '@/components/Select';

export default function Home() {


  const [Gen1, setGen1] = useState(false)
  const [Gen2, setGen2] = useState(false)
  const [Gen3, setGen3] = useState(false)
  const [Gen4, setGen4] = useState(false)
  const [Gen5, setGen5] = useState(false)
  const [Gen6, setGen6] = useState(false)
  const [Gen7, setGen7] = useState(false)
  const [Gen8, setGen8] = useState(false)
  const [Gen9, setGen9] = useState(false)

  const [SortPokeDex, setPokedex] = useState([] as any);
  const [Darken, toggleDarken] = useState(false);
  const [blur, setBlur] = useState(0);
  const [Score, setScore] = useState(0);
  const [Time, setTime] = useState(0);
  const [TLSquare, setTLSquare] = useState(false)
  const [TRSquare, setTRSquare] = useState(false)
  const [BLSquare, setBLSquare] = useState(false)
  const [BRSquare, setBRSquare] = useState(false)
  const [Pokemon, setPokemon] = useState("" as any)
  const [inputValue, setInputValue] = useState("")


  const FilterPokeDex = async () => {
    let pokedex: any = [];
    PokeDex.filter((pokemon: any, i: number) => {
      if (pokemon.is_default) {
        pokedex.push({ ...pokemon })
      }
    })
    let genPokeDex: any = [];
    await pokedex.filter((pokemon: any, i: number) => {
      if (Gen1 === true) {
        if (pokemon.generation === 1) {
          genPokeDex.push({ ...pokemon })
        }
      }
      if (Gen2 === true) {
        if (pokemon.generation === 2) {
          genPokeDex.push({ ...pokemon })
        }
      }
      if (Gen3 === true) {
        if (pokemon.generation === 3) {
          genPokeDex.push({ ...pokemon })
        }
      }
    })
    setPokedex(genPokeDex);
  }

  const GeneratePokemon = async () => {
    const Pokemon = await selectRandomFromArray(SortPokeDex);
    setPokemon(Pokemon)
  }

  const handleInput = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
    if (event.target.value.toLowerCase() === Pokemon.pokemon_name.toLowerCase()) {
      await GeneratePokemon()
      setInputValue("")
      setScore(Score + 1)
    }
  }

  const handleChecks = async (event: React.ChangeEvent<HTMLInputElement>) => {
    await FilterPokeDex()
    console.log(SortPokeDex)
    console.log(Gen1, Gen2, Gen3)
  
  }

  useEffect(() => {
    FilterPokeDex()
  }, [])

  return (
    <>
      <Head>
        <title>Guess The Pokemon</title>
      </Head>

      <main>
        <>
          <h1>Guess the Pokemon!</h1>

          <button onClick={() => { toggleDarken(!Darken) }}>Darken</button>

          <Select name="Gen 1" checked={Gen1} onChange={async (event: any) => { setGen1(!Gen1); console.log(Gen1) }} />
          <Select name="Gen 2" checked={Gen2} onChange={async (event: any) => { setGen2(!Gen2); await handleChecks(event) }} />
          <Select name="Gen 3" checked={Gen3} onChange={async (event: any) => { setGen3(!Gen3); await handleChecks(event) }} />
          <Select name="Gen 4" checked={Gen4} onChange={(event: any) => { setGen4(!Gen4); handleChecks(event) }} />
          <Select name="Gen 5" checked={Gen5} onChange={(event: any) => { setGen5(!Gen5); handleChecks(event) }} />

          <div>
            {Score}
            <button onClick={() => { GeneratePokemon(); setInputValue("") }}>I dont know</button>
            {Pokemon &&
              <>
                <div>
                  {TLSquare && <div className={`${styles.square} ${styles.topleft}`}> </div>}
                  {TRSquare && <div className={`${styles.square} ${styles.topright}`}> </div>}
                  {BLSquare && <div className={`${styles.square} ${styles.bottomleft}`}> </div>}
                  {BRSquare && <div className={`${styles.square} ${styles.bottomright}`}> </div>}
                  <p>{Pokemon.generation}</p>
                  <Image className={`${Darken && styles.darken} ${blur === 25 && styles.blur25}`} src={`/pokemon/${Pokemon.pokemon_name.toLowerCase().replace(/ /g, "_")}.png`} alt={`${Pokemon.primary_color} pokemon its shape is a ${Pokemon.shape}.`} width={150} height={150} />
                </div>
                <input onChange={handleInput} value={inputValue} />
              </>
            }
          </div>
          <div className={styles.grid}>
            {SortPokeDex && SortPokeDex.map((pokemon: any, i: number) => (
              <div key={i}>
                <h4>{pokemon.pokemon_name}</h4>
                {TLSquare && <div className={`${styles.square} ${styles.topleft}`}> </div>}
                {TRSquare && <div className={`${styles.square} ${styles.topright}`}> </div>}
                {BLSquare && <div className={`${styles.square} ${styles.bottomleft}`}> </div>}
                {BRSquare && <div className={`${styles.square} ${styles.bottomright}`}> </div>}
                <Image src={`/pokemon/${pokemon.pokemon_name.toLowerCase().replace(/ /g, "_")}.png`} alt={`${pokemon.primary_color} pokemon its shape is a ${pokemon.shape}.`} width={25} height={25} />
              </div>
            ))
            }
          </div>


        </>
      </main>
    </>
  )
}
