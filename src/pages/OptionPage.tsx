import React from 'react';
import { Box, Typography, Paper, IconButton, Avatar, Grid } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

interface OptionPageProps {
  companyName: string;
  logoUrl?: string;
  onSelect: (option: 'email' | 'wati') => void;
}

const OptionPage: React.FC<OptionPageProps> = ({ companyName, logoUrl, onSelect }) => {
  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Paper elevation={3} sx={{ p: 2, borderRadius: 3, textAlign: 'center', cursor: 'pointer', width: 140, height: 170, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transition: '0.2s', '&:hover': { boxShadow: 8, bgcolor: '#e3f2fd' } }} onClick={() => onSelect('email')}>
              <IconButton size="large" sx={{ bgcolor: '#1976d2', color: 'white', mb: 1, width: 64, height: 64, '&:hover': { bgcolor: '#1565c0' } }}>
                <EmailIcon sx={{ fontSize: 40 }} />
              </IconButton>
              <Typography variant="subtitle1" fontWeight={600}>Email</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Paper elevation={3} sx={{ p: 2, borderRadius: 3, textAlign: 'center', cursor: 'pointer', width: 140, height: 170, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transition: '0.2s', '&:hover': { boxShadow: 8, bgcolor: '#e3f2fd' } }} onClick={() => onSelect('wati')}>
              <IconButton size="large" sx={{ bgcolor: '#43a047', color: 'white', mb: 1, width: 64, height: 64, '&:hover': { bgcolor: '#2e7d32' } }}>
                <ChatBubbleIcon sx={{ fontSize: 40 }} />
              </IconButton>
              <Typography variant="subtitle1" fontWeight={600}>Wati</Typography>
            </Paper>
          </Grid>
        </Grid>
    </Box>
  );
};

export default OptionPage; 