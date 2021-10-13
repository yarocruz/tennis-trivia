export type Player = {
    id: number,
    first_name: string,
    last_name: string,
    full_name: string,
    country: string,
    ranking: number,
    movement: string,
    ranking_points: number
}

// playerData is an array of the Player type above which is filled with the tennisPlayers.json data
export const playerData: Player[] = require("../data/tennisPlayers.json")
export const top100Players = playerData.slice(0, 100)

const allCountries = playerData.map((player) => player.country).sort()
export const uniqueCountries = [...Array.from(new Set(allCountries))]