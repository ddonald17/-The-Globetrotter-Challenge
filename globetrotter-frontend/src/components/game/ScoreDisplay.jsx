import React from 'react';
import { useUser } from '../../contexts/UserContext';

const ScoreDisplay = () => {
  const { user } = useUser();

  if (!user || !user.score) return null;

  const totalGames = user.score.correct + user.score.incorrect;
  const percentage = totalGames > 0 
    ? Math.round((user.score.correct / totalGames) * 100) 
    : 0;

  return (
    <div className="flex justify-center mb-6">
      <div className="bg-white rounded-lg shadow-md py-2 px-4 flex space-x-6">
        <div className="text-center">
          <p className="text-xs text-gray-500 uppercase">Correct</p>
          <p className="text-xl font-bold text-green-600">{user.score.correct}</p>
        </div>
        
        <div className="text-center">
          <p className="text-xs text-gray-500 uppercase">Incorrect</p>
          <p className="text-xl font-bold text-red-600">{user.score.incorrect}</p>
        </div>
        
        <div className="text-center">
          <p className="text-xs text-gray-500 uppercase">Accuracy</p>
          <p className="text-xl font-bold text-indigo-600">{percentage}%</p>
        </div>
      </div>
    </div>
  );
};

export default ScoreDisplay;
