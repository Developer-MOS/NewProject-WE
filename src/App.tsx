import React, { useCallback, useEffect, useState } from 'react';
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
import NotificationModal from './components/notification';
import useSSE from './components/useSSE';
import { useWati } from './context/WatiContext.types';

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
  const [openEmailNotification, setOpenEmailNotification] = useState(false);
  const [openWatiNotification, setOpenWatiNotification] = useState(false);
  const [reFetchMessages, setReFetchMessages] = useState(false);


  // const { reFetchMessages, setReFetchMessages } = useWati();


  const navigate = useNavigate();


  const handleNew = useCallback((payload) => {

    setReFetchMessages(!reFetchMessages);

    setOpenWatiNotification(true);

    console.log(payload, 'This is the payload I have . . . . ');
  }, []);

  useSSE(handleNew);


  useEffect(() => {

    setLoginData({
      logo: null,
      companyName: '',
      apiKey: '',
      apiUrl: '',
      clientId: '',
    })

  }, [])


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
      // navigate('/wati'); 
    }, 800);
  };

  if (loading) return <LoadingScreen />;

  if (!loginData) {
    return <Routes>
      <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>;
  }


  return (
    <AppContext.Provider value={{ loginData, setLoginData, logoUrl, openEmailNotification, setOpenEmailNotification, openWatiNotification, setOpenWatiNotification, setLogoUrl, selected: null, setSelected: () => { } }}>
      <EmailProvider>
        <WatiProvider>
          <Layout companyName={loginData.companyName} logoUrl={logoUrl}>
            <Routes>
              <Route path="/wati" element={<HomePage />} />
              <Route path="/email" element={<EmailApp />} />
              <Route path="/dailer" element={<DailerPage />} />
              <Route path="/statics" element={<StaticsPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
            <NotificationModal
              type="wati"
              open={openWatiNotification}
              onClose={() => setOpenWatiNotification(false)}
              onReply={() => setOpenWatiNotification(false)}
            />
          </Layout>
        </WatiProvider>
      </EmailProvider>
    </AppContext.Provider>
  );
};

const App: React.FC = () => (
  <Router>
    <AppRoutes />
  </Router>
);

export default App;
