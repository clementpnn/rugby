
export interface Team{
    teamName: string,
    result?: string
}
export interface Teams{
    data: Team[]
}
export const TeamsData: Teams[] = [
  {
    data: [
      {
        teamName: 'FRANCE',
        result: 'W'
      },
      {
        teamName: 'NEW_ZEALAND',
        result: 'L'
      }
    ]
  }
]

