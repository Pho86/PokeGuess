import styles from "./NavBar.module.sass"
import Link from "next/link"
import Image from "next/image"
export default function NavBar({
    active,
}: {
    active: number
}) {
    return (
        <nav className={styles.navBar}>
            <div className={styles.topNav}>
                <Link href={"/"} className={`${active === 1 && styles.active}`}>
                    <Image src="/logo.svg" alt="logo" width={50} height={50} />
                    <h1>
                        PokéGuess
                    </h1>
                </Link>
                <Link href={"/pokedex"} className={`${active === 2 && styles.active}`} tabIndex={0}>
                    < h3>Pokédex</ h3>
                </Link>
                <Link href={"/leaderboard"} className={`${active === 3 && styles.active}`} tabIndex={0}>
                    < h3>Leaderboard</ h3>
                </Link>
            </div>
            <div>
                <Link href={"http://github.com/pho86"} target="_blank" tabIndex={0}>
                    <h3>Made by: Pho</h3>
                </Link>
            </div>

        </nav>
    )
}