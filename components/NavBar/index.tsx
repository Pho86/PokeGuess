import styles from "./NavBar.module.sass"
import Link from "next/link"
export default function NavBar({
    active,
}: {
    active: number
}) {
    return (
        <nav className={styles.navBar}>
            <div className={styles.topNav}>
                <Link href={"/"}>
                    <h1>PokéGuess</h1>
                </Link>
                <Link href={"/"} className={`${active === 1 && styles.active}`}>
                    < h3>Home</ h3>
                </Link>
                <Link href={"/pokedex"} className={`${active === 2 && styles.active}`}>
                    < h3>Pokédex</ h3>
                </Link>
                <Link href={"/leaderboard"} className={`${active === 3 && styles.active}`}>
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