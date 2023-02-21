import Head from 'next/head';
import PokeDex from "@/data/pokedex.json";
import { useState, useEffect, useRef } from 'react';
import styles from "@/styles/Home.module.scss";
import { selectRandomFromArray, generateRandomNumber } from "@/util";
import PokeCard from '@/components/PokeCard';
import Button from '@/components/Button';
import NavBar from '@/components/NavBar';
import axios from "axios";
import Popup from '@/components/ScorePopup';
import { pokemonProps } from "@/types";
import SelectTab from '@/components/SelectTab';
import { useRouter } from 'next/router';
import useSound from 'use-sound';



export default function Home() {

  //pokedex
  const [SortPokeDex, setPokedex] = useState([] as any);
  const [Pokemon, setPokemon] = useState("" as any)
  const [PreviousPokemon, setPreviousPokemon] = useState("" as any)
  const [PreviousGuess, setPreviousGuess] = useState("")

  // pokedex filters
  const [Gen1, setGen1] = useState(true)
  const [Gen2, setGen2] = useState(true)
  const [Gen3, setGen3] = useState(true)
  const [Gen4, setGen4] = useState(true)
  const [Gen5, setGen5] = useState(true)
  const [Gen6, setGen6] = useState(true)
  const [Gen7, setGen7] = useState(true)
  const [Gen8, setGen8] = useState(true)
  // Gen9 is not in JSON File, used for testing purposes
  const [Gen9, setGen9] = useState(false)

  // image filters
  const [OneSecond, setOneSecond] = useState(false)
  const [Darken, toggleDarken] = useState(false);
  const [Blur, setBlur] = useState(false);
  const [TLSquare, setTLSquare] = useState(false)
  const [TRSquare, setTRSquare] = useState(false)
  const [BLSquare, setBLSquare] = useState(false)
  const [BRSquare, setBRSquare] = useState(false)

  // game states
  const [Time, setTime] = useState(0);
  const [User, setUser] = useState("")
  const [Score, setScore] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [Disabled, toggleDisabled] = useState(true)
  const [PopUp, togglePopUp] = useState(false);
  const [Win, toggleWin] = useState(false)
  const Timer = useRef(0 as any);
  const [buttonDisable, setButtonDisable] = useState(false)

  // sound states
  const [Volume, setVolume] = useState(1);
  const [correct] = useSound('/sounds/ding.mp3', { volume: Volume });
  const [wrong] = useSound('/sounds/wrong.mp3', { volume: Volume });

  const router = useRouter();

  const TimerStart = async () => {
    let x = 0;
    Timer.current = setInterval(() => {
      x += 1
      setTime(x)
    }, 1000)
  }

  const FilterPokemon = async () => {
    let pokedex: any = [];
    PokeDex.filter((pokemon: pokemonProps, i: number) => {
      if (pokemon.is_default) {
        pokedex.push({ ...pokemon })
      }
    })
    return pokedex
  }

  const FilterPokeDex = async () => {
    const pokedex = await FilterPokemon()
    setPokedex([])
    let genPokeDex: any = [];
    await pokedex.filter((pokemon: pokemonProps, i: number) => {
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
      // Gen9 is for testing purposes
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
    if (SortPokeDex.length >= 1) {
      PokemonNum = generateRandomNumber(0, SortPokeDex.length - 1);
      setPokemon(SortPokeDex[PokemonNum])
      if (remove) SortPokeDex.splice(PokemonNum, 1);
    }
    else {
      toggleWin(true)
      clearInterval(Timer.current)
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
        correct()
      } else {
        setPreviousGuess(event.target.value)
        EndGame(false)
        wrong()
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
      EndGame(false)
    }
  }

  const postData = async () => {
    await axios.post('/api/score', { User, Time, Score, Darken, Blur, OneSecond, Gen1, Gen2, Gen3, Gen4, Gen5, Gen6, Gen7, Gen8, TLSquare, BLSquare, TRSquare, BRSquare })
    router.push('/leaderboard')
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
    if (!Gen1 && !Gen2 && !Gen3 && !Gen4 && !Gen5 && !Gen6 && !Gen7 && !Gen8 && !Gen9) {
      wrong()
      alert("you need to select a generation")
      return;
    }
    setPreviousPokemon(Pokemon);
    await FilterPokeDex()
    if (remove) GeneratePokemon(true);
    else GeneratePokemon(false);
    setInputValue("");
    setScore(0)
    toggleDisabled(false);
    setBRSquare(false)
    setBLSquare(false)
    setTLSquare(false)
    setTRSquare(false)
    setButtonDisable(false)
    TimerStart()
  }

  const EndGame = async (reset: boolean) => {
    toggleDisabled(true)
    clearInterval(Timer.current)
    setPreviousPokemon(Pokemon);
    setInputValue("");
    if (reset) return
    togglePopUp(true)
  }

  useEffect(() => {
    FilterPokemon()
    FilterPokeDex()
  }, [])

  return (
    <>

      <Head>
        <title>Home | PokéGuess</title>
      </Head>

      <NavBar active={1} />
      <main className={styles.main}>
        <>
          <div className={styles.CardCol}>
            <div className={styles.toptabs}>
              <div className={styles.tab}>
                <p>Time: {Time}</p>
              </div>
              <div className={styles.tab}>
                <p>Score: {Score}</p>
              </div>
            </div>

            <div className={styles.CardRow}>
              <div className={styles.CardCol}>
                <SelectTab name="B&W" checked={Darken} side={false} onClick={() => { toggleDarken(!Darken); EndGame(true) }} />
                <SelectTab name="Blur" checked={Blur} side={false} onClick={() => { setBlur(!Blur); EndGame(true) }} />
                <SelectTab name="1 Sec" checked={OneSecond} side={false} onClick={() => { setOneSecond(!OneSecond); EndGame(true) }} />
                <SelectTab name="Sound" checked={Volume === 1} side={false} onClick={() => { if (Volume === 1) setVolume(0); else { setVolume(1) } }} />
              </div>

              <div className={styles.PokeCard}>
                <PokeCard Pokemon={Pokemon} TLSquare={TLSquare} TRSquare={TRSquare} BLSquare={BLSquare} BRSquare={BRSquare} Blur={Blur} Darken={Darken} onChange={handleInput} onKeyDown={handleInput} value={inputValue} disabled={Disabled} />
                {Disabled ? <Button onClick={() => { StartGame(true) }} type={"button"}>Start!</Button> : <div className={styles.buttons}><Button onClick={() => { GeneratePokemon(false); setInputValue(""); }} type={"button"}>I don&apos;t know</Button><Button onClick={() => { SubmitInput() }} type={"button"}>Submit</Button></div>}
              </div>
              <div className={styles.CardCol}>
                <SelectTab name="Gen 1" checked={Gen1} side={true} onClick={() => { setGen1(!Gen1); EndGame(true); FilterPokeDex() }} />
                <SelectTab name="Gen 2" checked={Gen2} side={true} onClick={() => { setGen2(!Gen2); EndGame(true); FilterPokeDex() }} />
                <SelectTab name="Gen 3" checked={Gen3} side={true} onClick={() => { setGen3(!Gen3); EndGame(true); FilterPokeDex() }} />
                <SelectTab name="Gen 4" checked={Gen4} side={true} onClick={() => { setGen4(!Gen4); EndGame(true); FilterPokeDex() }} />
                <SelectTab name="Gen 5" checked={Gen5} side={true} onClick={() => { setGen5(!Gen5); EndGame(true); FilterPokeDex() }} />
                <SelectTab name="Gen 6" checked={Gen6} side={true} onClick={() => { setGen6(!Gen6); EndGame(true); FilterPokeDex() }} />
                <SelectTab name="Gen 7" checked={Gen7} side={true} onClick={() => { setGen7(!Gen7); EndGame(true); FilterPokeDex() }} />
                <SelectTab name="Gen 8" checked={Gen8} side={true} onClick={() => { setGen8(!Gen8); EndGame(true); FilterPokeDex() }} />
              </div>
            </div>
          </div>


          <Popup onExit={() => { togglePopUp(false) }} show={PopUp}>
            <h3>You Lost.</h3>
            <p>You guessed <b>{PreviousGuess}</b> and it was <b>{PreviousPokemon.pokemon_name}</b>.</p>
            <p>Your score was <b>{Score}.</b></p>
            <p>Your time was <b>{Time} seconds</b>.</p>
            <input type="text" className={styles.popup_input} value={User} placeholder={"Enter your name"} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setUser(event.target.value) }} />
            <Button disabled={buttonDisable} onClick={async () => { if (User) { await postData(); togglePopUp(false); setButtonDisable(true) } else alert('put a name please') }}>Submit Score</Button>
          </Popup>

          <Popup onExit={() => { toggleWin(false) }} show={Win}>
            <h3>Congratulations!</h3>
            <p>You completed the PokeDex.</p>
            <p>Your score was <b>{Score}</b>.</p>
            <p>Your time was <b>{Time} seconds.</b></p>
            <input type="text" className={styles.popup_input} value={User} placeholder={"Enter your name"} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setUser(event.target.value) }} />
            <Button disabled={buttonDisable} onClick={async () => { if (User) { await postData(); toggleWin(false); setButtonDisable(true) } else alert('put a name please') }}>Submit Score</Button>
          </Popup>

        </>
      </main>
    </>

  )
}
