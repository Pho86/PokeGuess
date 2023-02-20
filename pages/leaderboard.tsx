import { prisma } from '../server/db/client'
import axios from 'axios';
import Head from 'next/head';
import styles from "@/styles/Leaderboard.module.scss";
import { useEffect, useState } from 'react';
import NavBar from '@/components/NavBar';
import { LeaderboardProps } from '@/types';
import Popup from '@/components/ScorePopup';

export default function Leaderboard({
    data
}: {
    data: LeaderboardProps
}) {

    const [PopUp, togglePopUp] = useState(false);
    const [userinfo, setUserInfo] = useState({} as LeaderboardProps)
    useEffect(() => {

    }, [])
    return (
        <>
            <Head>
                <title>Leaderboard | PokéGuess</title>
            </Head>
            <NavBar active={3} />
            <main className={styles.main}>
                <h1>PokéGuess Leaderboard</h1>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Time</th>
                            <th>Score</th>
                            <th className={styles.date}>Date</th>
                            <th className={styles.m_hide}>B&W</th>
                            <th className={styles.m_hide}>Blur</th>
                            <th className={styles.m_hide}>1 Sec</th>
                            <th className={styles.m_hide}>Gen I</th>
                            <th className={styles.m_hide}>Gen II</th>
                            <th className={styles.m_hide}>Gen III</th>
                            <th className={styles.m_hide}>Gen IV</th>
                            <th className={styles.m_hide}>Gen V</th>
                            <th className={styles.m_hide}>Gen VI</th>
                            <th className={styles.m_hide}>Gen VII</th>
                            <th className={styles.m_hide}>Gen VIII</th>
                            <th className={styles.see_more}>More Info</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((user: LeaderboardProps, _index: number) => (
                            <tr key={user.id}>
                                <th>{user.User}</th>
                                <th>{user.Time}</th>
                                <th>{user.Score}</th>
                                <th >{new Date(user.createdAt).toLocaleDateString('en-GB')}</th>
                                <th className={`${user.Darken ? styles.true : styles.false}`}>{user.Darken ? "✓" : "✗"}</th>
                                <th className={`${user.Blur ? styles.true : styles.false}`}>{user.Blur ? "✓" : "✗"}</th>
                                <th className={`${user.OneSecond ? styles.true : styles.false}`}>{user.OneSecond ? "✓" : "✗"}</th>
                                <th className={`${user.Gen1 ? styles.true : styles.false}`}>{user.Gen1 ? "✓" : "✗"}</th>
                                <th className={`${user.Gen2 ? styles.true : styles.false}`}>{user.Gen2 ? "✓" : "✗"}</th>
                                <th className={`${user.Gen3 ? styles.true : styles.false}`}>{user.Gen3 ? "✓" : "✗"}</th>
                                <th className={`${user.Gen4 ? styles.true : styles.false}`}>{user.Gen4 ? "✓" : "✗"}</th>
                                <th className={`${user.Gen5 ? styles.true : styles.false}`}>{user.Gen5 ? "✓" : "✗"}</th>
                                <th className={`${user.Gen6 ? styles.true : styles.false}`}>{user.Gen6 ? "✓" : "✗"}</th>
                                <th className={`${user.Gen7 ? styles.true : styles.false}`}>{user.Gen7 ? "✓" : "✗"}</th>
                                <th className={`${user.Gen8 ? styles.true : styles.false}`}>{user.Gen8 ? "✓" : "✗"}</th>
                                <th className={`${styles.see_more} `} onClick={() => { setUserInfo(user); togglePopUp(true); }}>Click Here</th>
                            </tr>
                        ))}
                    </tbody>
                </table>

                    <Popup onExit={() => { togglePopUp(false) }} show={PopUp}>
                        <h1>{userinfo.User}&apos;s info</h1>
                        <p>Their score was <b>{userinfo.Score}</b>.</p>
                        <p>Their time was <b>{userinfo.Time} seconds</b>.</p>
                        <p>They attempted the quiz on <b>{new Date(userinfo.createdAt).toLocaleDateString('en-GB')}</b>.</p>
                        <table className={styles.popuptable}>
                            <thead>
                                <tr>
                                    <th>B&W</th>
                                    <th >Blur</th>
                                    <th >1 Sec</th>
                                    <th >I</th>
                                    <th >II</th>
                                    <th >III</th>
                                    <th >IV</th>
                                    <th >V</th>
                                    <th >VI</th>
                                    <th >VII</th>
                                    <th >VIII</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th className={`${userinfo.Darken ? styles.true_sm : styles.false_sm}`}>{userinfo.Darken ? "✓" : "✗"}</th>
                                    <th className={`${userinfo.Blur ? styles.true_sm : styles.false_sm}`}>{userinfo.Blur ? "✓" : "✗"}</th>
                                    <th className={`${userinfo.OneSecond ? styles.true_sm : styles.false_sm}`}>{userinfo.OneSecond ? "✓" : "✗"}</th>
                                    <th className={`${userinfo.Gen1 ? styles.true_sm : styles.false_sm}`}>{userinfo.Gen1 ? "✓" : "✗"}</th>
                                    <th className={`${userinfo.Gen2 ? styles.true_sm : styles.false_sm}`}>{userinfo.Gen2 ? "✓" : "✗"}</th>
                                    <th className={`${userinfo.Gen3 ? styles.true_sm : styles.false_sm}`}>{userinfo.Gen3 ? "✓" : "✗"}</th>
                                    <th className={`${userinfo.Gen4 ? styles.true_sm : styles.false_sm}`}>{userinfo.Gen4 ? "✓" : "✗"}</th>
                                    <th className={`${userinfo.Gen5 ? styles.true_sm : styles.false_sm}`}>{userinfo.Gen5 ? "✓" : "✗"}</th>
                                    <th className={`${userinfo.Gen6 ? styles.true_sm : styles.false_sm}`}>{userinfo.Gen6 ? "✓" : "✗"}</th>
                                    <th className={`${userinfo.Gen7 ? styles.true_sm : styles.false_sm}`}>{userinfo.Gen7 ? "✓" : "✗"}</th>
                                    <th className={`${userinfo.Gen8 ? styles.true_sm : styles.false_sm}`}>{userinfo.Gen8 ? "✓" : "✗"}</th>
                                </tr>
                            </tbody>
                        </table>
                    </Popup>
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