import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import { GameProvider } from './contexts/GameContext';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import GamePage from './pages/GamePage';
import ChallengePage from './pages/ChallengePage';
import ProfilePage from './pages/ProfilePage';
import UserRegistration from './components/user/UserRegistration';

function App() {
  return (
    <Router>
      <UserProvider>
        <GameProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/register" element={<UserRegistration />} />
              <Route path="/game" element={<GamePage />} />
              <Route path="/challenge/:accessCode" element={<ChallengePage />} />
              <Route path="/profile/:username" element={<ProfilePage />} />
            </Routes>
          </Layout>
        </GameProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
