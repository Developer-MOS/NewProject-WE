import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Layout from './components/Layout';
import { Box, CircularProgress } from '@mui/material';
import { AppContext } from './context/AppContext';
import HomePage from './wati/Pages/mainPage';
import { EmailProvider } from './context/EmailContext';
import EmailApp from './email';
import DailerPage from './pages/DailerPage';
import StaticsPage from './pages/StaticsPage';
import DashboardPage from './pages/DashboardPage';
import WatiProvider from './context/WatiContext';

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

// const WatiPage: React.FC<{ onBack: () => void }> = ({ onBack }) => (
//   <Box>
//     <h2>Wati Page</h2>
//     <button onClick={onBack}>Back to Options</button>
//   </Box>
// );

const AppRoutes: React.FC = () => {
  const [loginData, setLoginData] = useState<LoginData | null>(null);
  const [logoUrl, setLogoUrl] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);
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
      navigate('/wati'); // Go directly to sidebar layout after login
    }, 800);
  };

  if (loading) return <LoadingScreen />;

  if (!loginData) {
    return <Routes>
      <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>;
  }

  // After login, always show Layout with sidebar
  return (
    <EmailProvider>
      <WatiProvider>
        <AppContext.Provider value={{ loginData, setLoginData, logoUrl, setLogoUrl, selected: null, setSelected: () => { } }}>
          <Layout companyName={loginData.companyName} logoUrl={logoUrl}>
            <Routes>
              <Route path="/wati" element={<HomePage />} />
              <Route path="/email" element={<EmailApp />} />
              <Route path="/dailer" element={<DailerPage />} />
              <Route path="/statics" element={<StaticsPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
          </Layout>
        </AppContext.Provider>
      </WatiProvider>
    </EmailProvider>
  );
};

const App: React.FC = () => (
  <Router>
    <AppRoutes />
  </Router>
);

export default App;
