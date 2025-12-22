
import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import ChatInterface from '../components/ChatInterface';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<string>('');

  const handleLogin = (username: string) => {
    setCurrentUser(username);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
      {!isLoggedIn ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <ChatInterface currentUser={currentUser} onLogout={handleLogout} />
      )}
    </div>
  );
};

export default Index;
