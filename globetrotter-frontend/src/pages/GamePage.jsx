import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import GameBoard from '../components/game/GameBoard';

const GamePage = () => {
  const { user, loading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/register');
    }
  }, [user, loading, navigate]);

  console.log('GamePage:', { user, loading });
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-indigo-800 mb-8">
          Guess the Destination
        </h1>
        
        <GameBoard />
      </div>
    </div>
  );
};

export default GamePage;
