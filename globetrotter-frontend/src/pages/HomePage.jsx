import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import Button from '../components/common/Button';

const HomePage = () => {
  const { user } = useUser();

  return (
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-indigo-800 mb-6">
            The Ultimate Travel Guessing Game
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Test your travel knowledge with cryptic clues about famous destinations around the world!
          </p>
          
          <div className="flex justify-center space-x-4">
            {user ? (
              <Link to="/game">
                <Button className="px-8 py-3 text-lg">
                  Start Playing
                </Button>
              </Link>
            ) : (
              <Link to="/register">
                <Button className="px-8 py-3 text-lg">
                  Join Now
                </Button>
              </Link>
            )}
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-3xl mb-4">🧩</div>
            <h3 className="text-xl font-bold text-indigo-700 mb-2">Solve Clues</h3>
            <p className="text-gray-600">
              Decode cryptic hints and guess famous destinations from around the world.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-3xl mb-4">🌟</div>
            <h3 className="text-xl font-bold text-indigo-700 mb-2">Learn Facts</h3>
            <p className="text-gray-600">
              Discover fascinating trivia and fun facts about each destination.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-3xl mb-4">🏆</div>
            <h3 className="text-xl font-bold text-indigo-700 mb-2">Challenge Friends</h3>
            <p className="text-gray-600">
              Compete with friends to see who has the best travel knowledge!
            </p>
          </div>
        </div>
        
        <div className="bg-indigo-50 p-8 rounded-xl">
          <h2 className="text-2xl font-bold text-indigo-800 mb-4">How to Play</h2>
          <ol className="text-left max-w-xl mx-auto space-y-4 text-gray-700">
            <li className="flex">
              <span className="bg-indigo-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">1</span>
              <span>Read the cryptic clues about a mystery destination</span>
            </li>
            <li className="flex">
              <span className="bg-indigo-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">2</span>
              <span>Choose the correct answer from multiple options</span>
            </li>
            <li className="flex">
              <span className="bg-indigo-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">3</span>
              <span>Discover fun facts about each destination</span>
            </li>
            <li className="flex">
              <span className="bg-indigo-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">4</span>
              <span>Challenge your friends to beat your score</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
