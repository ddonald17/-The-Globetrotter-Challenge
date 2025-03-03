import React, { createContext, useState, useContext } from 'react';

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  const [currentDestination, setCurrentDestination] = useState(null);
  const [revealedInfo, setRevealedInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const resetGame = () => {
    setCurrentDestination(null);
    setRevealedInfo(null);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowFeedback(false);
  };

  return (
    <GameContext.Provider
      value={{
        currentDestination,
        setCurrentDestination,
        revealedInfo,
        setRevealedInfo,
        isLoading,
        setIsLoading,
        selectedAnswer,
        setSelectedAnswer,
        isCorrect,
        setIsCorrect,
        showFeedback,
        setShowFeedback,
        resetGame
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
