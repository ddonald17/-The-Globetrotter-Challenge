import React from 'react';
import Confetti from 'react-confetti';
import Button from '../common/Button';
import { useGame } from '../../contexts/GameContext';
import { getRandomDestination } from '../../services/destinationService';

const FeedbackModal = () => {
  const { 
    isCorrect, 
    revealedInfo, 
    showFeedback, 
    setShowFeedback,
    setCurrentDestination,
    resetGame,
    setIsLoading
  } = useGame();

  if (!showFeedback || !revealedInfo) return null;

  const handlePlayAgain = async () => {
    setShowFeedback(false);
    setIsLoading(true);
    try {
      const newDestination = await getRandomDestination();
      resetGame();
      setCurrentDestination(newDestination);
    } catch (error) {
      console.error('Error getting new destination:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      {isCorrect && <Confetti recycle={false} numberOfPieces={500} />}
      
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <div className="text-center mb-4">
          {isCorrect ? (
            <div className="text-green-500 text-5xl mb-2">🎉</div>
          ) : (
            <div className="text-red-500 text-5xl mb-2">😢</div>
          )}
          
          <h3 className={`text-2xl font-bold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
            {isCorrect ? 'Correct!' : 'Oops! Wrong answer'}
          </h3>
        </div>
        
        <div className="mb-6">
          <p className="text-gray-600 mb-4">
            The answer was <span className="font-bold text-indigo-600">{revealedInfo.city}, {revealedInfo.country}</span>
          </p>
          
          <div className="bg-indigo-50 rounded-lg p-4">
            <h4 className="font-medium text-indigo-800 mb-2">Fun Fact:</h4>
            <p className="text-gray-700">
              {revealedInfo.funFacts && revealedInfo.funFacts.length > 0 
                ? revealedInfo.funFacts[Math.floor(Math.random() * revealedInfo.funFacts.length)]
                : "No fun facts available for this destination."}
            </p>
          </div>
        </div>
        
        <div className="flex justify-center">
          <Button onClick={handlePlayAgain} className="px-6">
            Play Again
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;