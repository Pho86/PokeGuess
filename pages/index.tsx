import Head from 'next/head';
import Image from 'next/image';
import { Children, DetailedHTMLProps } from 'react';
import PokeDex from "@/data/pokedex.json";
import { useState, useEffect } from 'react';
import styles from "@/styles/home.module.scss";
import { selectRandomFromArray, generateRandomNumber } from "@/util";
import Select from '@/components/Select';
import PokeCard from '@/components/PokeCard';
import Button from '@/components/Button';
import NavBar from '@/components/NavBar';

export default function Home() {


  const [Gen1, setGen1] = useState(true)
  const [Gen2, setGen2] = useState(true)
  const [Gen3, setGen3] = useState(true)
  const [Gen4, setGen4] = useState(false)
  const [Gen5, setGen5] = useState(false)
  const [Gen6, setGen6] = useState(false)
  const [Gen7, setGen7] = useState(false)
  const [Gen8, setGen8] = useState(false)
  const [Gen9, setGen9] = useState(false)

  const [onesecond, setoneSecond] = useState(false)

  const [SortPokeDex, setPokedex] = useState([] as any);
  const [Darken, toggleDarken] = useState(false);
  const [Blur, setBlur] = useState(0);
  const [Score, setScore] = useState(0);
  const [Time, setTime] = useState(0);
  const [TLSquare, setTLSquare] = useState(false)
  const [TRSquare, setTRSquare] = useState(false)
  const [BLSquare, setBLSquare] = useState(false)
  const [BRSquare, setBRSquare] = useState(false)
  const [Pokemon, setPokemon] = useState("" as any)
  const [PreviousPokemon, setPreviousPokemon] = useState("" as any)
  const [inputValue, setInputValue] = useState("");
  const [Disabled, toggleDisabled] = useState(true)

  const FilterPokemon = async () => {
    let pokedex: any = [];
    PokeDex.filter((pokemon: any, i: number) => {
      if (pokemon.is_default) {
        pokedex.push({ ...pokemon })
      }
    })
    return pokedex
  }

  const FilterPokeDex = async () => {
    const pokedex = await FilterPokemon()
    let genPokeDex: any = [];
    await pokedex.filter((pokemon: any, i: number) => {
      if (Gen1) {
        if (pokemon.generation === 1) {
          genPokeDex.push({ ...pokemon })
        }
      }
      if (Gen2) {
        if (pokemon.generation === 2) {
          genPokeDex.push({ ...pokemon })
        }
      }
      if (Gen3) {
        if (pokemon.generation === 3) {
          genPokeDex.push({ ...pokemon })
        }
      }
      if (Gen4) {
        if (pokemon.generation === 4) {
          genPokeDex.push({ ...pokemon })
        }
      }
      if (Gen5) {
        if (pokemon.generation === 5) {
          genPokeDex.push({ ...pokemon })
        }
      }
      if (Gen6) {
        if (pokemon.generation === 6) {
          genPokeDex.push({ ...pokemon })
        }
      }
      if (Gen7) {
        if (pokemon.generation === 7) {
          genPokeDex.push({ ...pokemon })
        }
      }
      if (Gen8) {
        if (pokemon.generation === 8) {
          genPokeDex.push({ ...pokemon })
        }
      }
    })
    console.log(genPokeDex)
    console.log(Gen1, Gen2, Gen3)
    setPokedex(genPokeDex);
  }

  const GeneratePokemon = async () => {
    const Pokemon = await selectRandomFromArray(SortPokeDex);
    setPokemon(Pokemon)
    Delay()
  }

  const handleInput = async (event: React.ChangeEvent<HTMLInputElement> & React.KeyboardEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
    if (event.key === "Enter") {
      if (event.target.value.toLowerCase() === Pokemon.pokemon_name.toLowerCase()) {
        setPreviousPokemon(Pokemon)
        await GeneratePokemon()
        setInputValue("")
        setScore(Score + 1)
      } else {
        EndGame()
      }
    }
  }

  const handleChecks = async (event: React.ChangeEvent<HTMLInputElement>) => {

  }
  const Delay = async () => {
    if (onesecond) {
      setTimeout(() => {
        setBRSquare(true)
        setBLSquare(true)
        setTLSquare(true)
        setTRSquare(true)
      }, 1000)
    }
  }

  const StartGame = async () => {
    setPreviousPokemon(Pokemon);
    GeneratePokemon();
    setInputValue("");
    toggleDisabled(false);
    setBRSquare(false)
    setBLSquare(false)
    setTLSquare(false)
    setTRSquare(false)
  }

  const EndGame = async () => {
    toggleDisabled(true)
    setPreviousPokemon(Pokemon);
    setInputValue("");
  }

  useEffect(() => {
    FilterPokemon()
    FilterPokeDex()
  }, [])

  return (
    <>
      <Head>
        <title>PokeGuess</title>
      </Head>

      <NavBar />
      <main className={styles.main}>
        <>
          <Select name="Darken" checked={Darken} onChange={async (event: any) => { toggleDarken(!Darken); EndGame() }} />
          <Select name="1 Second" checked={onesecond} onChange={(event: any) => { setoneSecond(!onesecond); EndGame() }} />
          <Select name="Gen 1" checked={Gen1} onChange={async (event: any) => { setGen1(!Gen1); EndGame() }} />
          <Select name="Gen 2" checked={Gen2} onChange={async (event: any) => { setGen2(!Gen2); EndGame() }} />
          <Select name="Gen 3" checked={Gen3} onChange={async (event: any) => { setGen3(!Gen3); EndGame() }} />
          <Select name="Gen 4" checked={Gen4} onChange={(event: any) => { setGen4(!Gen4); handleChecks(event) }} />
          <Select name="Gen 5" checked={Gen5} onChange={(event: any) => { setGen5(!Gen5); handleChecks(event) }} />

          {Score}

          <div className={styles.PokeCard}>
            <>
              <PokeCard Pokemon={Pokemon} TLSquare={TLSquare} TRSquare={TRSquare} BLSquare={BLSquare} BRSquare={BRSquare} Blur={Blur} Darken={Darken} onChange={handleInput} onKeyDown={handleInput} value={inputValue} disabled={Disabled} />
              {Disabled ? <Button onClick={() => { StartGame() }} type={"button"}>Start!</Button> : <Button onClick={() => { StartGame() }} type={"button"}>I don&apos;t know</Button>}
            </>
            {PreviousPokemon && <p>Previous: {PreviousPokemon.pokemon_name}</p>}
          </div>


          {Score >= 1 && Disabled && <p><button>XXXX</button></p>}

          <div className={styles.grid}>
            {/* {SortPokeDex && SortPokeDex.map((pokemon: any, i: number) => (
              <div key={i}>
                <h4>{pokemon.pokemon_name}</h4>
                <Image src={`/pokemon/${pokemon.pokemon_name.toLowerCase().replace(/ /g, "_")}.png`} alt={`${pokemon.primary_color} pokemon its shape is a ${pokemon.shape}.`} width={25} height={25} />
              </div>
            ))
            } */}
          </div>


        </>
      </main>
    </>
  )
}
