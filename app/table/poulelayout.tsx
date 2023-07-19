
export interface TeamData{
  teamName : string,
  GP: number,
  V: number,
  N: number,
  L: number,
  DP: number,
  B: number,
  Pts: number
}
export interface Poules{
  pouleName: string,
  data: TeamData[]
}

export const poulesData: Poules[] = [
  {
    pouleName: 'A',
    data: [
      {
        teamName: 'FRANCE',
        GP: 4,
        V: 0,
        N: 0,
        L: 0,
        DP: 0,
        B: 0,
        Pts: 0
      },
      {
        teamName: 'NEW_ZEALAND',
        GP: 3,
        V: 0,
        N: 0,
        L: 0,
        DP: 0,
        B: 0,
        Pts: 0
      },
      {
        teamName: 'NEW_ZEALAND',
        GP: 4,
        V: 0,
        N: 0,
        L: 0,
        DP: 0,
        B: 0,
        Pts: 0
      },
      {
        teamName: 'GEORGIA',
        GP: 4,
        V: 0,
        N: 0,
        L: 0,
        DP: 0,
        B: 0,
        Pts: 0
      },
      {
        teamName: 'PORTUGAL',
        GP: 4,
        V: 0,
        N: 0,
        L: 0,
        DP: 0,
        B: 0,
        Pts: 0
      }
    ]
  },
  {
    pouleName: 'B',
    data: [
      {
        teamName: 'FIJI',
        GP: 0,
        V: 0,
        N: 0,
        L: 0,
        DP: 0,
        B: 0,
        Pts: 0
      },
      {
        teamName: 'SAMOA',
        GP: 0,
        V: 0,
        N: 0,
        L: 0,
        DP: 0,
        B: 0,
        Pts: 0
      },
      {
        teamName: 'CHILI',
        GP: 0,
        V: 0,
        N: 0,
        L: 0,
        DP: 0,
        B: 0,
        Pts: 0
      },
      {
        teamName: 'SOUTH_AFRICA',
        GP: 0,
        V: 0,
        N: 0,
        L: 0,
        DP: 0,
        B: 0,
        Pts: 0
      },
      {
        teamName: 'ROMANIA',
        GP: 0,
        V: 0,
        N: 0,
        L: 0,
        DP: 0,
        B: 0,
        Pts: 0
      }
    ]
  },
  {
    pouleName: 'C',
    data: [
      {
        teamName: 'AUSTRALIA',
        GP: 0,
        V: 0,
        N: 0,
        L: 0,
        DP: 0,
        B: 0,
        Pts: 0
      },
      {
        teamName: 'ITALY',
        GP: 0,
        V: 0,
        N: 0,
        L: 0,
        DP: 0,
        B: 0,
        Pts: 0
      },
      {
        teamName: 'URUGUAY',
        GP: 0,
        V: 0,
        N: 0,
        L: 0,
        DP: 0,
        B: 0,
        Pts: 0
      },
      {
        teamName: 'NAMIBIA',
        GP: 0,
        V: 0,
        N: 0,
        L: 0,
        DP: 0,
        B: 0,
        Pts: 0
      },
      {
        teamName: 'WALES',
        GP: 0,
        V: 0,
        N: 0,
        L: 0,
        DP: 0,
        B: 0,
        Pts: 0
      }
    ]
  }
]
