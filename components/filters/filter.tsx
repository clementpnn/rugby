'use client'

import * as React from 'react'
// import { Button } from '@/components/ui/button'
import { useState } from 'react'

type Match = {
  team1: string;
  team2: string;
};

type PoolCategory = {
  category: string;
  teams: string[];
};

const Component: React.FC = () => {
  const [ phase, setPhase ] = useState<'Pool' | 'Knockout'>( 'Pool' )
  const [ selectedPool, setSelectedPool ] = useState<string>( '' )
  const [ selectedTeam, setSelectedTeam ] = useState<string>( '' )
  const [ matches, setMatches ] = useState<Match[]>( [] )

  const poolCategories: PoolCategory[] = [
    {
      category: 'Pool A',
      teams: [ 'Team1A', 'Team2A', 'Team3A', 'Team4A', 'Team5A' ]
    },
    {
      category: 'Pool B',
      teams: [ 'Team1B', 'Team2B', 'Team3B', 'Team4B', 'Team5B' ]
    },
    {
      category: 'Pool C',
      teams: [ 'Team1C', 'Team2C', 'Team3C', 'Team4C', 'Team5C' ]
    },
    {
      category: 'Pool D',
      teams: [ 'Team1D', 'Team2D', 'Team3D', 'Team4D', 'Team5D' ]
    }
  ]

  const handlePoolButtonClick = () => {
    setPhase( 'Pool' )
    setSelectedPool( '' )
    setSelectedTeam( '' )
    setMatches( [] )
  }

  const handleKnockoutButtonClick = () => {
    setPhase( 'Knockout' )
    setSelectedPool( '' )
    setSelectedTeam( '' )
    setMatches( [] )
  }

  const handlePoolCategoryClick = ( category: string ) => {
    setSelectedPool( category )
    setSelectedTeam( '' )
    setMatches( [] )
  }

  const handleTeamClick = ( team: string ) => {
    setSelectedTeam( team )
    const selectedPoolTeams =
      poolCategories.find( ( category ) => category.category === selectedPool )
        ?.teams || []
    const otherTeams = selectedPoolTeams.filter( ( t ) => t !== team )
    const poolMatches: Match[] = otherTeams.map( ( t ) => ( {
      team1: team,
      team2: t
    } ) )
    setMatches( poolMatches )
  }

  const handleQuarterFinalButtonClick = () => {
    setSelectedPool( '' )
    setSelectedTeam( '' )
    setMatches( [
      { team1: 'Quarter1 Team1', team2: 'Quarter1 Team2' },
      { team1: 'Quarter2 Team1', team2: 'Quarter2 Team2' },
      { team1: 'Quarter3 Team1', team2: 'Quarter3 Team2' },
      { team1: 'Quarter4 Team1', team2: 'Quarter4 Team2' }
    ] )
  }

  const handleSemiFinalButtonClick = () => {
    setSelectedPool( '' )
    setSelectedTeam( '' )
    setMatches( [
      { team1: 'Semi1 Team1', team2: 'Semi1 Team2' },
      { team1: 'Semi2 Team1', team2: 'Semi2 Team2' }
    ] )
  }

  const handleFinalButtonClick = () => {
    setSelectedPool( '' )
    setSelectedTeam( '' )
    setMatches( [ { team1: 'Final Team1', team2: 'Final Team2' } ] )
  }

  return (
    <div>
      <h1 style={{ fontWeight: 'bold' }}>Title</h1>

      <button onClick={handlePoolButtonClick}>Pool</button>
      <button onClick={handleKnockoutButtonClick}>Knockout</button>

      {phase === 'Pool' && (
        <div>
          {poolCategories.map( ( category ) => (
            <button
              key={category.category}
              onClick={() => handlePoolCategoryClick( category.category )}
              className={selectedPool === category.category ? 'active' : ''}
            >
              {category.category}
            </button>
          ) )}
        </div>
      )}

      {phase === 'Knockout' && (
        <div>
          <button onClick={handleQuarterFinalButtonClick}>Quarter Final</button>
          <button onClick={handleSemiFinalButtonClick}>Semi Final</button>
          <button onClick={handleFinalButtonClick}>Final</button>
        </div>
      )}

      {phase === 'Pool' && selectedPool !== '' && selectedTeam === '' && (
        <div>
          {poolCategories
            .find( ( category ) => category.category === selectedPool )
            ?.teams.map( ( team ) => (
              <button
                key={team}
                onClick={() => handleTeamClick( team )}
                className={selectedTeam === team ? 'active' : ''}
              >
                {team}
              </button>
            ) )}
        </div>
      )}

      {selectedTeam !== '' && (
        <div>
          <h2>{selectedTeam} Matches:</h2>
          {matches.map( ( match, index ) => (
            <div key={index}>
              <span>{match.team1}</span> vs <span>{match.team2}</span>
            </div>
          ) )}
        </div>
      )}

      {phase === 'Knockout' && matches.length > 0 && (
        <div>
          <h2>Matches:</h2>
          {matches.map( ( match, index ) => (
            <div key={index}>
              <span>{match.team1}</span> vs <span>{match.team2}</span>
            </div>
          ) )}
        </div>
      )}
    </div>
  )
}

export default Component
