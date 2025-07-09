import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import OptionPage from './pages/OptionPage';
import Layout from './components/Layout';
import { Box, CircularProgress } from '@mui/material';

interface LoginData {
  logo: File | null;
  companyName: string;
  apiKey: string;
  apiUrl: string;
  clientId: string;
}

const LoadingScreen: React.FC = () => (
  <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%)' }}>
    <CircularProgress size={60} color="primary" />
  </Box>
);

const EmailPage: React.FC<{ onBack: () => void }> = ({ onBack }) => (
  <Box>
    <h2>Email Page</h2>
    <button onClick={onBack}>Back to Options</button>
  </Box>
);

const WatiPage: React.FC<{ onBack: () => void }> = ({ onBack }) => (
  <Box>
    <h2>Wati Page</h2>
    <button onClick={onBack}>Back to Options</button>
  </Box>
);

const AppRoutes: React.FC = () => {
  const [loginData, setLoginData] = useState<LoginData | null>(null);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<null | 'email' | 'wati'>(null);
  const [logoUrl, setLogoUrl] = useState<string | undefined>(undefined);
  const navigate = useNavigate();

  const handleLogin = (data: LoginData) => {
    setLoginData(data);
    if (data.logo) {
      setLogoUrl(URL.createObjectURL(data.logo));
    } else {
      setLogoUrl(undefined);
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/options');
    }, 800);
  };

  const handleOptionSelect = (option: 'email' | 'wati') => {
    setLoading(true);
    setTimeout(() => {
      setSelected(option);
      setLoading(false);
      navigate(`/${option}`);
    }, 600);
  };

  const handleBackToOptions = () => {
    setSelected(null);
    navigate('/options');
  };

  const handleBackToLogin = () => {
    setLoginData(null);
    setLogoUrl(undefined);
    setSelected(null);
    navigate('/');
  };

  if (loading) return <LoadingScreen />;

  return (
    <Routes>
      <Route path="/" element={
        !loginData ? <LoginPage onLogin={handleLogin} /> : <Navigate to="/options" />
      } />
      <Route path="/options" element={
        loginData ? (
          <OptionPage
            companyName={loginData.companyName}
            logoUrl={logoUrl}
            onSelect={handleOptionSelect}
            onBack={handleBackToLogin}
          />
        ) : <Navigate to="/" />
      } />
      <Route path="/email" element={
        loginData && selected === 'email' ? (
          <Layout companyName={loginData.companyName} logoUrl={logoUrl}>
            <EmailPage onBack={handleBackToOptions} />
          </Layout>
        ) : <Navigate to="/options" />
      } />
      <Route path="/wati" element={
        loginData && selected === 'wati' ? (
          <Layout companyName={loginData.companyName} logoUrl={logoUrl}>
            <WatiPage onBack={handleBackToOptions} />
          </Layout>
        ) : <Navigate to="/options" />
      } />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

const App: React.FC = () => (
  <Router>
    <AppRoutes />
  </Router>
);

export default App;
