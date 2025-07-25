import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper, Avatar, CircularProgress, IconButton } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const LoginPage: React.FC<{ onLogin: (data: { logo: File | null; companyName: string; apiKey: string; apiUrl: string; clientId: string; }) => void }> = ({ onLogin }) => {
  const [logo, setLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [companyName, setCompanyName] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [apiUrl, setApiUrl] = useState('');
  const [clientId, setClientId] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogo(e.target.files[0]);
      setLogoPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin({ logo, companyName, apiKey, apiUrl, clientId });
    }, 1200);
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%)' }}>
      <Paper
        elevation={0}
        sx={{
          position: 'relative',
          overflow: 'hidden',
          p: { xs: 0.5, sm: 1, md: 1.2, lg: 1.5 },
          borderRadius: 2,
          maxWidth: { xs: 200, sm: 220, md: 240, lg: 260, xl: 480 },
          width: '100%',
          minWidth: { xs: '90vw', sm: 160, md: 180, lg: 200 },
          mx: 'auto',
          boxSizing: 'border-box',
          background: 'transparent',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)',
          border: '2px solid rgba(255,255,255,0.35)',
          '::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 0,
            background: 'linear-gradient(135deg, rgba(255,255,255,0.55) 60%, rgba(245,245,255,0.8) 100%)',
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
            pointerEvents: 'none',
          },
        }}
      >
        <Box display="flex" flexDirection="column" alignItems="center" gap={0.5} sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="h6" fontWeight={700} mb={1} color="primary" fontSize={16}>Company Login</Typography>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="logo-upload"
            type="file"
            onChange={handleLogoChange}
          />
          <label htmlFor="logo-upload">
            <IconButton component="span" size="small" style={{ scale: 2 }}>
              <Avatar src={logoPreview || undefined} sx={{ width: 32, height: 32, bgcolor: '#e3e3e3' }}>
                {!logoPreview && <CloudUploadIcon fontSize="small" />}
              </Avatar>
            </IconButton>
          </label>
          <Typography fontSize={11} variant="caption" color="text.secondary" sx={{ pt: 1 }}>Upload Company Logo</Typography>
          <TextField
            label="Company Name"
            variant="outlined"
            fullWidth
            value={companyName}
            onChange={e => setCompanyName(e.target.value)}
            sx={{ mt: 2 }}
          />
          <Typography variant="subtitle1" fontWeight={600} mt={2} alignSelf="flex-start">Wati</Typography>
          <TextField
            label="API Key"
            variant="outlined"
            fullWidth
            value={apiKey}
            onChange={e => setApiKey(e.target.value)}
            sx={{ mt: 1 }}
          />
          <TextField
            label="API URL"
            variant="outlined"
            fullWidth
            value={apiUrl}
            onChange={e => setApiUrl(e.target.value)}
            sx={{ mt: 1 }}
          />
          <Typography variant="subtitle1" fontWeight={600} mt={2} alignSelf="flex-start">Email</Typography>
          <TextField
            label="Client ID"
            variant="outlined"
            fullWidth
            value={clientId}
            onChange={e => setClientId(e.target.value)}
            sx={{ mt: 1 }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            sx={{ mt: 3, borderRadius: 2, height: 48 }}
            onClick={handleLogin}
            // disabled={loading || !companyName || !apiKey || !apiUrl || !clientId}
          >
            {loading ? <CircularProgress size={28} color="inherit" /> : 'Login'}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginPage; 