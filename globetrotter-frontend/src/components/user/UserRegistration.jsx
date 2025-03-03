import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../services/userService';
import { useUser } from '../../contexts/UserContext';
import Card from '../common/Card';
import Button from '../common/Button';
import ErrorMessage from '../common/ErrorMessage';

const UserRegistration = () => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username.trim()) {
      setError('Username is required');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      const user = await createUser(username);
      login(user);
      navigate('/game');
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message);
      } else {
        setError('An error occurred while creating your account');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6 text-indigo-800">Join the Adventure</h2>
      
      {error && <ErrorMessage message={error} />}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 mb-2">
            Choose a Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter a username (3-20 characters)"
            minLength={3}
            maxLength={20}
            required
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full py-3"
          disabled={isLoading}
        >
          {isLoading ? 'Creating Account...' : 'Start Playing'}
        </Button>
      </form>
    </Card>
  );
};

export default UserRegistration;