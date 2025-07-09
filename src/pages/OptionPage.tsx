import React from 'react';
import { Box, Typography, Paper, IconButton, Avatar, Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import EmailIcon from '@mui/icons-material/Email';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

interface OptionPageProps {
  companyName: string;
  logoUrl?: string;
  onSelect: (option: 'email' | 'wati') => void;
  onBack: () => void;
}

const OptionPage: React.FC<OptionPageProps> = ({ companyName, logoUrl, onSelect, onBack }) => {
  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Paper elevation={6} sx={{ p: 4, borderRadius: 4, minWidth: { xs: '90vw', sm: 400 }, maxWidth: 500, width: '100%', mb: 3 }}>
        <Box display="flex" alignItems="center" gap={2} mb={3}>
          <Avatar src={logoUrl} sx={{ width: 56, height: 56, bgcolor: '#e3e3e3' }} />
          <Typography variant="h6" fontWeight={700}>{companyName}</Typography>
        </Box>
        <Typography variant="h5" fontWeight={600} align="center" mb={3} color="primary">
          Choose an Option
        </Typography>
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
        <Button variant="outlined" color="primary" fullWidth sx={{ mt: 4, borderRadius: 2 }} onClick={onBack}>
          Back
        </Button>
      </Paper>
    </Box>
  );
};

export default OptionPage; 