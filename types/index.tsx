
export type pokemonProps = {
    pokedex_number: number,
    pokemon_name: string,
    primary_color: string,
    shape: string,
    genus: string,
    type_1: string,
    type_2: string,
    female_rate: number,
    ability_1: string,
    ability_2: string,
    ability_3: string,
    generation: number,
    is_default: boolean,
    weight: number,
    height: number,

}

export type LeaderboardProps = {
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
    BRSquare: boolean,
    map: (children : any) => React.ReactNode
}