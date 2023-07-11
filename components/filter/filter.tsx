'use client'

import * as React from 'react'
import { useState } from 'react'


type PoolData = {
  pool: string;
  teams: string[];
};

const TeamImage: React.FC = () => {
  return (
    <div className='w-8 h-8 rounded-full bg-blue-500'></div>
  );
};

const Filter: React.FC = () => {
  const [showPool, setShowPool] = useState(false);
  const [activeTab, setActiveTab] = useState('');

  const handlePoolClick = () => {
    setShowPool(!showPool);
    setActiveTab('pool');
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const poolData: PoolData[] = [
    { pool: 'A', teams: ['TeamA1', 'TeamA2', 'TeamA3', 'TeamA4', 'TeamA5'] },
    { pool: 'B', teams: ['TeamB1', 'TeamB2', 'TeamB3', 'TeamB4', 'TeamB5'] },
    { pool: 'C', teams: ['TeamC1', 'TeamC2', 'TeamC3', 'TeamC4', 'TeamC5'] },
    { pool: 'D', teams: ['TeamD1', 'TeamD2', 'TeamD3', 'TeamD4', 'TeamD5'] }
  ];

  return (
    <div className='flex items-start justify-start h-882 w-423'>
      <div className='w-423 h-440 bg-gray-100 p-4'>
        <div className='flex flex-col gap-4'>
          <div className='w-423 h-240 bg-gray-100 p-4 ml-4 border-b-0'>
            <h1 className='text-3xl text-blue-500 font-bold mb-4'>Planning</h1>
            <div className='flex gap-4'>
              <button
                className={`px-6 py-3 border bg-transparent text-blue-500 rounded-lg ${
                  activeTab === 'pool' ? 'bg-blue-500 text-white cursor-pointer' : ''
                }`}
                onClick={handlePoolClick}
              >
                <span
                  className={`cursor-pointer ${
                    activeTab === 'pool' ? 'text-white' : ''
                  }`}
                  onClick={() => handleTabClick('pool')}
                >
                  Pool
                </span>
              </button>
              <button
                className={`px-6 py-3 border bg-transparent text-blue-500 rounded-lg ${
                  activeTab === 'knockout' ? 'bg-blue-500 text-white' : ''
                }`}
                onClick={() => setActiveTab('knockout')}
              >
                Knock-out
              </button>
            </div>
          </div>
          <div className='w-423 h-240 bg-gray-100 p-4 ml-4'>
            <h2 className='text-2xl text-blue-500 font-bold mb-4'>Filter</h2>
            {showPool && (
              <div className='flex flex-col gap-2'>
                {poolData.map((poolItem) => (
                  <div
                    key={poolItem.pool}
                    className={`border-b border-gray-300 ${
                      activeTab === `pool${poolItem.pool}` ? 'cursor-pointer' : ''
                    }`}
                    onClick={() => handleTabClick(`pool${poolItem.pool}`)}
                  >
                    <div className='flex items-center'>
                      <h1
                        className={`text-3xl text-blue-500 font-bold ${
                          activeTab === `pool${poolItem.pool}` ? 'text-blue-500 cursor-pointer' : ''
                        }`}
                      >
                        {poolItem.pool}
                      </h1>
                      <p className='ml-1'>Pool</p>
                    </div>
                    {activeTab === `pool${poolItem.pool}` && (
                      <ul className='mt-4 space-y-3'>
                        {poolItem.teams.map((team, index) => (
                          <li key={index} className='flex items-center gap-2'>
                            <TeamImage /> {team}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='w-423 h-240 bg-gray-100 p-48'>
        <h5 className='text-3xl font-bold mb-4'>Filter</h5>
        <Filter />
      </div>
    </div>
  );
};

export default App;