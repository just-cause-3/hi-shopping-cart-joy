
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import HomePage from './HomePage';

const Index = () => {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (isAuthenticated) {
        // If authenticated, show the home page
      } else {
        // If not authenticated, redirect to login
        navigate('/login');
      }
    }
  }, [isAuthenticated, loading, navigate]);

  // When authenticated, render the HomePage
  return isAuthenticated ? <HomePage /> : null;
};

export default Index;
