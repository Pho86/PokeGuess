import Head from 'next/head';
import Image from 'next/image';
import { Children, DetailedHTMLProps } from 'react';
import PokeDex from "@/data/pokedex.json";
import { useState, useEffect, useRef } from 'react';
import styles from "@/styles/home.module.scss";
import { selectRandomFromArray, generateRandomNumber } from "@/util";
import Select from '@/components/Select';
import PokeCard from '@/components/PokeCard';
import Button from '@/components/Button';
import NavBar from '@/components/NavBar';
import axios from "axios";
import Popup from '@/components/ScorePopup';

export default function Home() {


  const [Gen1, setGen1] = useState(true)
  const [Gen2, setGen2] = useState(false)
  const [Gen3, setGen3] = useState(false)
  const [Gen4, setGen4] = useState(false)
  const [Gen5, setGen5] = useState(false)
  const [Gen6, setGen6] = useState(false)
  const [Gen7, setGen7] = useState(false)
  const [Gen8, setGen8] = useState(false)

  // Gen9 is not in JSON File, used for testing purposes
  const [Gen9, setGen9] = useState(false)

  const [OneSecond, setOneSecond] = useState(false)

  const [SortPokeDex, setPokedex] = useState([] as any);
  const [User, setUser] = useState("")
  const [Darken, toggleDarken] = useState(false);
  const [Blur, setBlur] = useState(false);
  const [Score, setScore] = useState(0);
  const [Time, setTime] = useState(0);
  const [TLSquare, setTLSquare] = useState(false)
  const [TRSquare, setTRSquare] = useState(false)
  const [BLSquare, setBLSquare] = useState(false)
  const [BRSquare, setBRSquare] = useState(false)
  const [Pokemon, setPokemon] = useState("" as any)
  const [PreviousPokemon, setPreviousPokemon] = useState("" as any)
  const [PreviousGuess, setPreviousGuess] = useState("")
  const [inputValue, setInputValue] = useState("");
  const [Disabled, toggleDisabled] = useState(true)
  const [PopUp, togglePopUp] = useState(false);
  const [Win, toggleWin] = useState(false)
  const Timer = useRef("" as any);

  const TimerStart = async () => {
    let x = 0;
    Timer.current = setInterval(() => {
      x += 1
      setTime(x)
    }, 1000)
  }

  const FilterPokemon = async () => {
    let pokedex: any = [];
    PokeDex.filter((pokemon: any, i: number) => {
      if (pokemon.is_default) {
        pokedex.push({ ...pokemon })
      }
    })
    return pokedex
  }

  // hopefully find alternative to this if statement filter later
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
      if (Gen9) {
        if (pokemon.generation === 9) {
          genPokeDex.push({ ...pokemon })
        }
      }
    })
    setPokedex(genPokeDex);
  }

  const GeneratePokemon = async (remove: boolean) => {
    let PokemonNum;
    if(SortPokeDex.length >= 1) {
      PokemonNum = await generateRandomNumber(0, SortPokeDex.length - 1);
      setPokemon(SortPokeDex[PokemonNum])
      if (remove) SortPokeDex.splice(PokemonNum, 1);
    }
    else {
      toggleWin(true)
    }
    Delay()
  }

  const handleInput = async (event: React.ChangeEvent<HTMLInputElement> & React.KeyboardEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
    if (event.key === "Enter") {
      if (event.target.value.toLowerCase() === Pokemon.pokemon_name.toLowerCase()) {
        setPreviousPokemon(Pokemon)
        await GeneratePokemon(true)
        setPreviousGuess(event.target.value)
        setInputValue("")
        setScore(Score + 1)
      } else {
        setPreviousGuess(event.target.value)
        EndGame()
      }
    }
  }
  const SubmitInput = async () => {
    if (inputValue.toLowerCase() === Pokemon.pokemon_name.toLowerCase()) {
      setPreviousGuess(inputValue)
      setPreviousPokemon(Pokemon)
      await GeneratePokemon(true)
      setInputValue("")
      setScore(Score + 1)
    } else {
      setPreviousGuess(inputValue)
      EndGame()
    }
  }
  const postData = async () => {
    const response = axios.post('/api/score', { User, Time, Score, Darken, Blur, OneSecond, Gen1, Gen2, Gen3, Gen4, Gen5, Gen6, Gen7, Gen8, TLSquare, BLSquare, TRSquare, BRSquare })
    alert('your data has been sent.')
  }

  const handleChecks = async (event: React.ChangeEvent<HTMLInputElement>) => {

  }
  const Delay = async () => {
    setBRSquare(false)
    setBLSquare(false)
    setTLSquare(false)
    setTRSquare(false)
    if (OneSecond) {
      setTimeout(() => {
        setBRSquare(true)
        setBLSquare(true)
        setTLSquare(true)
        setTRSquare(true)
      }, 1000)
    }
  }

  const StartGame = async (remove: boolean) => {
    setPreviousPokemon(Pokemon);
    if (remove) GeneratePokemon(true);
    else GeneratePokemon(false);
    setInputValue("");
    setScore(0)
    toggleDisabled(false);
    setBRSquare(false)
    setBLSquare(false)
    setTLSquare(false)
    setTRSquare(false)
    TimerStart()
  }

  const EndGame = async () => {
    toggleDisabled(true)
    clearInterval(Timer.current)
    setPreviousPokemon(Pokemon);
    setInputValue("");
    if (Score >= 1) {
      togglePopUp(true)
    }
  }

  useEffect(() => {
    FilterPokemon()
    FilterPokeDex()
  }, [])

  return (
    <>
      <Head>
        <title>PokéGuess</title>
      </Head>

      <NavBar />
      <main className={styles.main}>
        <>
          <p>Time: {Time}</p>
          <p>Score: {Score}</p>
          <div className={styles.content}>

            <div className={styles.CardCol}>
              <Select name="B&W" checked={Darken} onChange={async (event: any) => { toggleDarken(!Darken); EndGame() }} />
              <Select name="Blur" checked={Blur} onChange={async (event: any) => { setBlur(!Blur); EndGame() }} />
              <Select name="1 Second" checked={OneSecond} onChange={(event: any) => { setOneSecond(!OneSecond); EndGame() }} />
            </div>

            <div className={styles.PokeCard}>
              <>
                <PokeCard Pokemon={Pokemon} TLSquare={TLSquare} TRSquare={TRSquare} BLSquare={BLSquare} BRSquare={BRSquare} Blur={Blur} Darken={Darken} onChange={handleInput} onKeyDown={handleInput} value={inputValue} disabled={Disabled} />
                {Disabled ? <Button onClick={() => { StartGame(true) }} type={"button"}>Start!</Button> : <div className={styles.buttons}><Button onClick={() => { GeneratePokemon(false) }} type={"button"}>I don&apos;t know</Button><Button onClick={() => { SubmitInput() }} type={"button"}>Submit</Button></div>}
              </>
            </div>
            <div className={styles.CardCol}>
              <Select name="Gen 1" checked={Gen1} onChange={(event: any) => { setGen1(!Gen1); EndGame() }} />
              <Select name="Gen 2" checked={Gen2} onChange={(event: any) => { setGen2(!Gen2); EndGame() }} />
              <Select name="Gen 3" checked={Gen3} onChange={(event: any) => { setGen3(!Gen3); EndGame() }} />
              <Select name="Gen 4" checked={Gen4} onChange={(event: any) => { setGen4(!Gen4); EndGame(); }} />
              <Select name="Gen 5" checked={Gen5} onChange={(event: any) => { setGen5(!Gen5); EndGame(); }} />
              <Select name="Gen 6" checked={Gen6} onChange={(event: any) => { setGen6(!Gen6); EndGame(); }} />
              <Select name="Gen 7" checked={Gen7} onChange={(event: any) => { setGen7(!Gen7); EndGame(); }} />
              <Select name="Gen 8" checked={Gen8} onChange={(event: any) => { setGen8(!Gen8); EndGame(); }} />
            </div>
          </div>

          {PreviousPokemon && <p>Previous: {PreviousPokemon.pokemon_name}</p>}

          {PopUp && <Popup onExit={() => { togglePopUp(false) }}>
            <p>You guessed {PreviousGuess} and it was {PreviousPokemon.pokemon_name}.</p>
            <p>Your score was {Score}.</p>
            <p>Your Time was {Time}.</p>
            <input type="text" value={User} placeholder={"Enter your name"} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setUser(event.target.value) }} />
            <button onClick={async () => { if (User) { await postData(); togglePopUp(false) } else alert('put a name please') }}>Submit Score</button>
          </Popup>}

          {Win && <Popup onExit={() => { togglePopUp(false) }}>
            <p>Congratulations! You completed the PokeDex.</p>
            <p>Your score was {Score}.</p>
            <p>Your time was {Time}.</p>
            <input type="text" value={User} placeholder={"Enter your name"} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setUser(event.target.value) }} />
            <button onClick={async () => { if (User) { await postData(); togglePopUp(false) } else alert('put a name please') }}>Submit Score</button>
          </Popup>}

        </>
      </main>
    </>
  )
}
