import { prisma } from '../server/db/client'
import axios from 'axios';
import Head from 'next/head';
import styles from "@/styles/Leaderboard.module.scss";
import { useEffect, useState } from 'react';
import NavBar from '@/components/NavBar';
import { LeaderboardProps } from '@/types';

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
            <NavBar active={3}/>
            <main className={styles.main}>
                <h1>Leaderboard</h1>
                <table className={styles.table}>
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
                        {data.map((user: LeaderboardProps, _index: number) => (
                            <tr key={user.id}>
                                <th>{user.User}</th>
                                <th>{user.Time}</th>
                                <th>{user.Score}</th>
                                <th>{new Date(user.createdAt).toLocaleDateString('en-GB')}</th>
                                <th>{user.Darken ? "✓" : "✗"}</th>
                                <th>{user.Blur ? "✓" : "✗"}</th>
                                <th>{user.Gen1 ? "✓" : "✗"}</th>
                                <th>{user.Gen2 ? "✓" : "✗"}</th>
                                <th>{user.Gen3 ? "✓" : "✗"}</th>
                                <th>{user.Gen4 ? "✓" : "✗"}</th>
                                <th>{user.Gen5 ? "✓" : "✗"}</th>
                                <th>{user.Gen6 ? "✓" : "✗"}</th>
                                <th>{user.Gen7 ? "✓" : "✗"}</th>
                                <th>{user.Gen8 ? "✓" : "✗"}</th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
        </>
    )
}

export async function getServerSideProps() {
    const data = await prisma.leaderboard.findMany({
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