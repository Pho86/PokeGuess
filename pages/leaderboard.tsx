import { prisma } from '../server/db/client'
import axios from 'axios';
import Head from 'next/head';
import styles from "@/styles/Leaderboard.module.scss";
import { useEffect, useState } from 'react';
import NavBar from '@/components/NavBar';
type LeaderboardProps = {
    id: number,
    User: string,
    Time: number,
    Darken: boolean,
    Blur: boolean,
    OneSecond: boolean,
    Gen1: boolean,
    Gen2: boolean,
    Gen3: boolean,
    Gen4: boolean,
    Gen5: boolean,
    Gen6: boolean,
    Gen7: boolean,
    Gen8: boolean,
    TLSquare: boolean,
    BLSquare: boolean,
    TRSquare: boolean,
    BRSquare: boolean
}
export default function Leaderboard({
    data
}: {
    data: LeaderboardProps
}) {
    const FetchLeaderboard = async () => {

    }
    useEffect(() => {
        console.log(data)
    }, [])
    return (
        <>
            <Head>
                <title>Leaderboard | PokeGuess</title>
            </Head>
            <NavBar />
            <main className={styles.main}>
                <h1>Leaderboard</h1>
                {data.map((user: LeaderboardProps, index: number) => (
                    <div key={user.id}>
                        <h2>{user.User}</h2>
                        <p>{user.Time}</p>
                    </div>
                ))}
            </main>
        </>
    )
}

export async function getServerSideProps() {
    const data = await prisma.Leaderboard.findMany()

    return {
        props: {
            data: JSON.parse(JSON.stringify(data))
        }
    }
}