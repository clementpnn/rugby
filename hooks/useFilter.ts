import create from 'zustand'

type Team = {
  team: string
  selected: boolean
}

type Pool = {
  poolName: string
  selected: boolean
  teams: Team[]
}

type FilterStore = {
  activeTab: string
  pools: Pool[]
  setActiveTab: ( _tab: string ) => void
  handlePoolClick: ( _index: number ) => void
  handleTeamClick: ( _poolIndex: number, _teamIndex: number ) => void
}

export const useFilterStore = create<FilterStore>( ( set ) => ( {
  activeTab: 'pools',
  pools: [
    {
      poolName: 'A',
      selected: false,
      teams: [
        {
          team: 'NEW_ZEALAND',
          selected: true
        },
        {
          team: 'FRANCE',
          selected: true
        },
        {
          team: 'ITALY',
          selected: true
        },
        {
          team: 'URUGUAY',
          selected: true
        },
        {
          team: 'NAMIBIA',
          selected: true
        }
      ]
    },
    {
      poolName: 'B',
      selected: false,
      teams: [
        {
          team: 'SOUTH_AFRICA',
          selected: true
        },
        {
          team: 'IRELAND',
          selected: true
        },
        {
          team: 'SCOTLAND',
          selected: true
        },
        {
          team: 'TONGUA',
          selected: true
        },
        {
          team: 'ROMANIA',
          selected: true
        }
      ]
    },
    {
      poolName: 'C',
      selected: false,
      teams: [
        {
          team: 'WALES',
          selected: true
        },
        {
          team: 'AUSTRALIA',
          selected: true
        },
        {
          team: 'FIJI',
          selected: true
        },
        {
          team: 'GEORGIA',
          selected: true
        },
        {
          team: 'PORTUGAL',
          selected: true
        }
      ]
    },
    {
      poolName: 'D',
      selected: false,
      teams: [
        {
          team: 'ENGLAND',
          selected: true
        },
        {
          team: 'JAPAN',
          selected: true
        },
        {
          team: 'ARGENTINA',
          selected: true
        },
        {
          team: 'SAMOA',
          selected: true
        },
        {
          team: 'CHILE',
          selected: true
        }
      ]
    }
  ],
  setActiveTab: ( tab: string ) => set( { activeTab: tab } ),
  handlePoolClick: ( index: number ) =>
    set( ( state ) => ( {
      pools: state.pools.map( ( pool, index_ ) => ( {
        ...pool,
        selected: index_ === index ? !pool.selected : pool.selected
      } ) )
    } ) ),
  handleTeamClick: ( poolIndex: number, teamIndex: number ) =>
    set( ( state ) => ( {
      pools: state.pools.map( ( pool, index ) => {
        if ( index === poolIndex ) {
          const updatedTeams = pool.teams.map( ( team, tIndex ) => ( {
            ...team,
            selected: tIndex === teamIndex ? !team.selected : team.selected
          } ) )
          return { ...pool, teams: updatedTeams }
        }
        return pool
      } )
    } ) )
} ) )
