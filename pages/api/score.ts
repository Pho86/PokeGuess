import type { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from "../../server/db/client"

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req

    switch (method) {
        case 'POST':
            // get the title and content from the request body
            const { user, time, Darken, Blur, OneSecond, Gen1, Gen2, Gen3, Gen4, Gen5, Gen6, Gen7, Gen8, TLSquare, BLSquare, TRSquare, BRSquare } = req.body
            // use prisma to create a new post using that data
            const leaderboardscore = await prisma.post.create({
                data: {
                    user,
                    time,
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