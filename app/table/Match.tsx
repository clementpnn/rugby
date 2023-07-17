interface MatchData {
    finish: boolean
    hour: string
    place: string
    firstTeam: string
    firstTeamFlag: string
    secondTeam: string
    secondTeamFlag: string
    GPFirst: number
    GPSecond: number
}

interface Match {
    data: MatchData
}

export const MatchData : Match[] = [
    {
        data: {
            finish: true,
            hour: "20:00",
            place: "Stade de Marseille",
            firstTeam: "ITA",
            firstTeamFlag: "/flags/ita.svg",
            secondTeam: "FRA",
            secondTeamFlag: "/flags/fra.svg",
            GPFirst: 54,
            GPSecond: 78
        }
    },
]