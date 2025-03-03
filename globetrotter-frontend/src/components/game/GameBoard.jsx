import React, { useEffect } from 'react';
import { useGame } from '../../contexts/GameContext';
import { getRandomDestination } from '../../services/destinationService';
import ClueDisplay from './ClueDisplay';
import AnswerOptions from './AnswerOptions';
import FeedbackModal from './FeedbackModal';
import ScoreDisplay from './ScoreDisplay';
import Button from '../common/Button';
import Loading from '../common/Loading';
import { useUser } from '../../contexts/UserContext';
import { createChallenge } from '../../services/challengeService';

const GameBoard = () => {
  const { 
    currentDestination, 
    setCurrentDestination, 
    isLoading, 
    setIsLoading,
    showFeedback
  } = useGame();
  
  const { user } = useUser();
  console.log('GameBoard:', { currentDestination, isLoading, showFeedback, user });

  useEffect(() => {
    const loadDestination = async () => {
      if (!currentDestination && !isLoading) {
        setIsLoading(true);
        try {
          const data = await getRandomDestination();
          setCurrentDestination(data);
        } catch (error) {
          console.error('Error loading destination:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadDestination();
  }, [currentDestination, isLoading, setCurrentDestination, setIsLoading]);

  const handleCreateChallenge = async () => {
    if (!user) return;
    console.log('Creating challenge for user:', user.id);
    
    try {
      const challenge = await createChallenge(user.id);
      
      // Create share URL
      const shareUrl = `${window.location.origin}/challenge/${challenge.accessCode}`;
      
      // Open share dialog
      if (navigator.share) {
        await navigator.share({
          title: 'Globetrotter Challenge',
          text: `${user.username} has challenged you to a game of Globetrotter! Can you beat their score?`,
          url: shareUrl
        });
      } else {
        // Fallback for browsers that don't support navigator.share
        window.open(`https://wa.me/?text=${encodeURIComponent(
          `${user.username} has challenged you to a game of Globetrotter! Can you beat their score? ${shareUrl}`
        )}`, '_blank');
      }
    } catch (error) {
      console.error('Error creating challenge:', error);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="max-w-3xl mx-auto px-4">
      <ScoreDisplay />
      
      {currentDestination && (
        <>
          <ClueDisplay clues={currentDestination.clues} />
          
          {!showFeedback && (
            <>
              <AnswerOptions />
              
              {user && (
                <div className="mt-8 flex justify-center">
                  <Button 
                    onClick={handleCreateChallenge}
                    primary={false}
                    className="flex items-center space-x-2"
                  >
                    <span>🏆</span>
                    <span>Challenge a Friend</span>
                  </Button>
                </div>
              )}
            </>
          )}
          
          <FeedbackModal />
        </>
      )}
    </div>
  );
};

export default GameBoard;