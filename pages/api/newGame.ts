/*
* This file inside the API folder sets up and end-point that you can request to
* I will create a "api/fileName" in this case "api/newGame"
* */

import { NextApiRequest, NextApiResponse } from "next"
import { top100Players } from "../../lib/players";

// we are doing the same thing here that getServerSideProps does in the Homepage
export default (req: NextApiRequest, res: NextApiResponse) => {
    const randomizedPlayers = top100Players.sort((a, b) => 0.5 - Math.random())
    // cut it down to just 5 tennis players
    const top5players = randomizedPlayers.slice(0, 5)

    // we implicitly return here the res object
    res.status(200).json({ players: top5players })
}
