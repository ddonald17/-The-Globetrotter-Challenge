import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserByUsername } from '../services/userService';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Loading from '../components/common/Loading';
import { useUser } from '../contexts/UserContext';

const ProfilePage = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        const userData = await getUserByUsername(username);
        setProfile(userData);
      } catch (err) {
        console.error('Error loading profile:', err);
        setError('Failed to load user profile.');
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      loadProfile();
    }
  }, [username]);

  if (loading) {
    return <Loading />;
  }

  if (error || !profile) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <Card className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Profile Not Found</h2>
          <p className="text-gray-600 mb-6">
            {error || `The user "${username}" could not be found.`}
          </p>
          <Button onClick={() => navigate(-1)}>Go Back</Button>
        </Card>
      </div>
    );
  }

  const totalGames = profile.score.correct + profile.score.incorrect;
  const accuracy = totalGames > 0 
    ? Math.round((profile.score.correct / totalGames) * 100) 
    : 0;

  return (
    <div className="container mx-auto px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="mb-8">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-indigo-800 mb-2">
              {profile.username}
            </h2>
            <p className="text-gray-600">
              Member since {new Date(profile.createdAt).toLocaleDateString()}
            </p>
          </div>
          
          <div className="bg-indigo-50 rounded-lg p-6 mb-6">
            <h3 className="text-xl font-bold text-indigo-800 mb-4 text-center">
              Player Stats
            </h3>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-xs text-gray-500 uppercase mb-1">Games Played</p>
                <p className="text-2xl font-bold text-indigo-600">{totalGames}</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-xs text-gray-500 uppercase mb-1">Correct</p>
                <p className="text-2xl font-bold text-green-600">{profile.score.correct}</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-xs text-gray-500 uppercase mb-1">Accuracy</p>
                <p className="text-2xl font-bold text-indigo-600">{accuracy}%</p>
              </div>
            </div>
          </div>
          
          {user && user.id === profile.id && (
            <div className="flex justify-center">
              <Button onClick={() => navigate('/game')}>
                Play More Games
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;