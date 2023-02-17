import type { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from "../../server/db/client"

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req

    switch (method) {
        case 'POST':
            // get the users data from the request's body
            console.log(req.body)
            const { User, Time, Score, Darken, Blur, OneSecond, Gen1, Gen2, Gen3, Gen4, Gen5, Gen6, Gen7, Gen8, TLSquare, BLSquare, TRSquare, BRSquare } = req.body
            // use prisma to create a new score using the data 
            const leaderboardscore = await prisma.leaderboard.create({
                data: {
                    User,
                    Time,
                    Score,
                    Darken,
                    Blur,
                    OneSecond,
                    Gen1,
                    Gen2,
                    Gen3,
                    Gen4,
                    Gen5,
                    Gen6,
                    Gen7,
                    Gen8,
                    TLSquare,
                    BLSquare,
                    TRSquare,
                    BRSquare
                }
            })
            // send the post object back to the client
            res.status(201).json(leaderboardscore)
            break
        default:
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}