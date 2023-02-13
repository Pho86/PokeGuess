import { prisma } from '../server/db/client'
import axios from 'axios';
import Head from 'next/head';
import styles from "@/styles/Leaderboard.module.scss";
import { useEffect, useState } from 'react';
import NavBar from '@/components/NavBar';
type LeaderboardProps = {
    id: number,
    User: string,
    createdAt: Date,
    Score: number,
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

    useEffect(() => {

    }, [])
    return (
        <>
            <Head>
                <title>Leaderboard | PokéGuess</title>
            </Head>
            <NavBar />
            <main className={styles.main}>
                <h1>Leaderboard</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Time</th>
                            <th>Score</th>
                            <th>Date</th>
                            <th>B&W</th>
                            <th>Blur</th>
                            <th>I</th>
                            <th>II</th>
                            <th>III</th>
                            <th>IV</th>
                            <th>V</th>
                            <th>VI</th>
                            <th>VII</th>
                            <th>VIII</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((user: LeaderboardProps, index: number) => (
                            <tr key={user.id}>
                                <th>{user.User}</th>
                                <th>{user.Time}</th>
                                <th>{user.Score}</th>
                                <th>{new Date(user.createdAt).toISOString().slice(0, 10)}</th>
                                <th>{user.Darken ? "yes" : "no"}</th>
                                <th>{user.Blur ? "yes" : "no"}</th>
                                <th>{user.Gen1 ? "yes" : "no"}</th>
                                <th>{user.Gen2 ? "yes" : "no"}</th>
                                <th>{user.Gen3 ? "yes" : "no"}</th>
                                <th>{user.Gen4 ? "yes" : "no"}</th>
                                <th>{user.Gen5 ? "yes" : "no"}</th>
                                <th>{user.Gen6 ? "yes" : "no"}</th>
                                <th>{user.Gen7 ? "yes" : "no"}</th>
                                <th>{user.Gen8 ? "yes" : "no"}</th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
        </>
    )
}

export async function getServerSideProps() {
    const data = await prisma.Leaderboard.findMany({
        orderBy: {
            Score: "desc"
        }
    })

    return {
        props: {
            data: JSON.parse(JSON.stringify(data))
        }
    }
}