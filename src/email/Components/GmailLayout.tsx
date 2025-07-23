import { Box } from '@mui/material';
import { useState } from 'react';
import EmailList from './EmailList';
import EmailView from './EmailView';
import ComposeEmail from './ComposeEmail';
import Header from './Header';
import Sidebar from './Sidebar';
import { useEmail } from '../../context/EmailContext';

const GmailLayout = () => {

  const { showCompose, setShowCompose } = useEmail();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleMenuClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (


    <Box sx={{ display: 'flex', flexDirection: 'column', height: '80vh' }}>
      <Header isSidebarOpen={isSidebarOpen} onMenuClick={handleMenuClick} />
      <Box sx={{ display: 'flex', width: '100%', height: 'calc(100vh - 64px)' }}>
        <Sidebar open={isSidebarOpen} />
        <Box
          sx={{
            height: '100vh',
            width: '400px',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            overflow: 'hidden',
            ml: isSidebarOpen ? 0 : '-262px',
            opacity: isSidebarOpen ? 1 : 1,
          }}
        >
          <EmailList />
        </Box>
        <EmailView />
        {showCompose && <ComposeEmail onClose={() => setShowCompose(false)} />}
      </Box>
    </Box>

  );
};

export default GmailLayout; 