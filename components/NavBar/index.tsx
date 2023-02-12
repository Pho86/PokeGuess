import styles from "./NavBar.module.sass"
import Link from "next/link"
export default function NavBar({

}) {
    return (
        <nav className={styles.navBar}>
            <Link href={"/"}>
                <h1>PokeGuess</h1>
            </Link>
            <Link href={"/"}>
                < h3>Home</ h3>
            </Link>
            <Link href={"/"}>
                < h3>Pokedex</ h3>
            </Link>
            <Link href={"/"}>
                < h3>Leaderboard</ h3>
            </Link>

        </nav>
    )
}