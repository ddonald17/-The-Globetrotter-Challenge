import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getChallenge } from '../services/challengeService';
import { getUserByUsername } from '../services/userService';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import GameBoard from '../components/game/GameBoard';
import Loading from '../components/common/Loading';
import { useUser } from '../contexts/UserContext';

const ChallengePage = () => {
  const { accessCode } = useParams();
  const [challenge, setChallenge] = useState(null);
  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useUser();

  useEffect(() => {
    const loadChallenge = async () => {
      try {
        setLoading(true);
        const challengeData = await getChallenge(accessCode);
        setChallenge(challengeData);
        
        if (challengeData.creator.id) {
          const creatorData = await getUserByUsername(challengeData.creator.username);
          setCreator(creatorData);
        }
      } catch (err) {
        console.error('Error loading challenge:', err);
        setError('Failed to load challenge. It may have expired or been removed.');
      } finally {
        setLoading(false);
      }
    };

    if (accessCode) {
      loadChallenge();
    }
  }, [accessCode]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <Card className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Challenge Not Found</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link to="/">
            <Button>Go Home</Button>
          </Link>
        </Card>
      </div>
    );
  }

  if (!challenge) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <Card className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Invalid Challenge</h2>
          <p className="text-gray-600 mb-6">This challenge doesn't exist or has expired.</p>
          <Link to="/">
            <Button>Go Home</Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        {creator && (
          <Card className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-indigo-800 mb-4">
              {creator.username}'s Challenge
            </h2>
            
            <div className="flex justify-center space-x-8 mb-4">
              <div>
                <p className="text-xs text-gray-500 uppercase">Correct</p>
                <p className="text-xl font-bold text-green-600">{creator.score?.correct || 0}</p>
              </div>
              
              <div>
                <p className="text-xs text-gray-500 uppercase">Incorrect</p>
                <p className="text-xl font-bold text-red-600">{creator.score?.incorrect || 0}</p>
              </div>
            </div>
            
            {!user && (
              <div className="mt-4">
                <Link to={`/register?accessCode=${accessCode}`}>
                  <Button>Sign Up to Accept Challenge</Button>
                </Link>
              </div>
            )}
          </Card>
        )}
        
        {user && <GameBoard />}
      </div>
    </div>
  );
};

export default ChallengePage;