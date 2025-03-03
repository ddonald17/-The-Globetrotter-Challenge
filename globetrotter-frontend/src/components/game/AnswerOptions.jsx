import React from 'react';
import { useGame } from '../../contexts/GameContext';
import { useUser } from '../../contexts/UserContext';
import { revealDestination } from '../../services/destinationService';
import { updateUserScore } from '../../services/userService';

const AnswerOptions = () => {
  const { 
    currentDestination, 
    setRevealedInfo, 
    setSelectedAnswer,
    setIsCorrect,
    setShowFeedback,
    setIsLoading
  } = useGame();
  
  const { user, updateScore } = useUser();

  if (!currentDestination || !currentDestination.possibleAnswers) return null;

  const handleAnswer = async (answerId) => {
    if (!user) return;

    setIsLoading(true);
    setSelectedAnswer(answerId);

    try {
      // Check if answer is correct
      const isCorrect = answerId === currentDestination.id;
      setIsCorrect(isCorrect);

      // Get destination details
      const destinationDetails = await revealDestination(currentDestination.id);
      setRevealedInfo(destinationDetails);

      // Update user score
      if (user && user.id) {
        const updatedUser = await updateUserScore(user.id, currentDestination.id, isCorrect);
        updateScore(updatedUser.score);
      }

      // Show feedback
      setShowFeedback(true);
    } catch (error) {
      console.error('Error processing answer:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      {currentDestination.possibleAnswers.map((answer) => (
        <button
          key={answer.id}
          onClick={() => handleAnswer(answer.id)}
          className="py-4 px-6 bg-white hover:bg-indigo-50 border-2 border-indigo-100 rounded-lg text-lg font-medium text-gray-800 transition duration-200 hover:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
        >
          {answer.city}
        </button>
      ))}
    </div>
  );
};

export default AnswerOptions;