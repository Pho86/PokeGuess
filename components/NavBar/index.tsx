import styles from "./NavBar.module.sass"
import Link from "next/link"
export default function NavBar({

}) {
    return (
        <nav className={styles.navBar}>
            <div className={styles.topNav}>
                <Link href={"/"}>
                    <h1>PokéGuess</h1>
                </Link>
                <Link href={"/"}>
                    < h3>Home</ h3>
                </Link>
                <Link href={"/pokedex"}>
                    < h3>Pokedex</ h3>
                </Link>
                <Link href={"/leaderboard"}>
                    < h3>Leaderboard</ h3>
                </Link>
            </div>
            <div>
                <Link href={"http://github.com/pho86"} target="_blank">
                    <h3>Made by: Pho86</h3>
                </Link>
            </div>

        </nav>
    )
}