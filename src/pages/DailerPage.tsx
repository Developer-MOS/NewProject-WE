import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Box, Typography, Paper, List, ListItem, ListItemAvatar,
  Avatar, ListItemText, useTheme, Button, Stack, Chip, TextField,
  IconButton, Grid, Divider, Tooltip, LinearProgress, InputAdornment,
} from '@mui/material';
import CallReceivedIcon from '@mui/icons-material/CallReceived';
import HistoryIcon from '@mui/icons-material/History';
import CallEndIcon from '@mui/icons-material/CallEnd';
import CallIcon from '@mui/icons-material/Call';
import BackspaceIcon from '@mui/icons-material/Backspace';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import QueueIcon from '@mui/icons-material/Queue';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import AddIcon from '@mui/icons-material/Add';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import dayjs from 'dayjs';
import { motion, AnimatePresence } from 'framer-motion';

// ---------- Types ----------
interface QueueItem { id: string; number: string; name?: string }
interface CallRecord {
  id: string;
  number: string;
  name?: string;
  time: string; // formatted
  status: 'answered' | 'missed' | 'declined' | 'ended';
  durationSec?: number;
}

// ---------- Utils ----------
const getInitials = (name?: string) => (name || '')
  .split(' ')
  .filter(Boolean)
  .map(n => n[0])
  .join('')
  .toUpperCase() || 'U';

const formatDuration = (s: number) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;

// Lightweight E.164-ish cleanup for demo
const cleanNumber = (raw: string) => raw.replace(/[^0-9+]/g, '');

// ---------- Incoming Call Card ----------
const IncomingCall: React.FC<{
  number: string;
  name?: string;
  onAnswer: () => void;
  onDecline: () => void;
  inCall: boolean;
  elapsedSec: number;
}> = ({ number, name, onAnswer, onDecline, inCall, elapsedSec }) => {
  const theme = useTheme();
  return (
    <Paper elevation={4} sx={{
      borderRadius: 3,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 1,
      bgcolor: theme.palette.mode === 'dark' ? '#263238' : '#e8f5e9',
      width: '100%',
      boxShadow: '0 8px 32px 0 rgba(67,160,71,0.13)',
      position: 'relative',
      overflow: 'hidden',
      p: 2,
    }}>
      <Avatar sx={{ bgcolor: '#43a047', width: 64, height: 64, mb: 1 }}>
        <CallReceivedIcon fontSize="large" />
      </Avatar>
      <Typography variant="h6" fontWeight={700} color="text.primary" align="center">
        {name || 'Unknown'}
      </Typography>
      <Typography variant="body1" color="text.secondary" fontWeight={500} align="center">
        {number}
      </Typography>
      <Chip
        label={inCall ? `In Call • ${formatDuration(elapsedSec)}` : 'Ringing...'}
        color={inCall ? 'success' : 'primary'}
        sx={{ mt: 1, fontWeight: 600, fontSize: 16, px: 2, py: 1, borderRadius: 2 }}
      />
      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
        {dayjs().format('hh:mm A')}
      </Typography>
      <Stack direction="row" spacing={3} mt={2}>
        {!inCall ? (
          <>
            <Button
              variant="contained"
              color="success"
              startIcon={<CallIcon />}
              onClick={onAnswer}
              sx={{ minWidth: 110, fontWeight: 600, fontSize: 16 }}
            >
              Answer
            </Button>
            <Button
              variant="contained"
              color="error"
              startIcon={<CallEndIcon />}
              onClick={onDecline}
              sx={{ minWidth: 110, fontWeight: 600, fontSize: 16 }}
            >
              Decline
            </Button>
          </>
        ) : (
          <Button
            variant="contained"
            color="error"
            startIcon={<CallEndIcon />}
            onClick={onDecline}
            sx={{ minWidth: 180, fontWeight: 600, fontSize: 16 }}
          >
            End Call
          </Button>
        )}
      </Stack>
    </Paper>
  );
};

// ---------- Dial Pad ----------
// const DialPad: React.FC<{
//   value: string;
//   onChange: (v: string) => void;
//   onCall: () => void;
//   onBackspace: () => void;
//   onAddToQueue: () => void;
// }> = ({ value, onChange, onCall, onBackspace, onAddToQueue }) => {
//   const theme = useTheme();
//   const keys = useMemo(() => [
//     ['1', '2', '3'],
//     ['4', '5', '6'],
//     ['7', '8', '9'],
//     ['*', '0', '#'],
//   ], []);

//   const press = (k: string) => onChange(cleanNumber(value + k));

//   return (
//     <Paper elevation={2} sx={{ p: 2, borderRadius: 3, bgcolor: theme.palette.mode === 'dark' ? '#263238' : '#f5f7fa' }}>
//       <Stack spacing={1.5}>
//         <TextField
//           fullWidth
//           size="medium"
//           value={value}
//           onChange={e => onChange(cleanNumber(e.target.value))}
//           placeholder="Type or use dial pad"
//           InputProps={{
//             startAdornment: <InputAdornment position="start">+</InputAdornment>,
//             endAdornment: (
//               <InputAdornment position="end">
//                 <Tooltip title="Backspace">
//                   <IconButton onClick={onBackspace}><BackspaceIcon /></IconButton>
//                 </Tooltip>
//               </InputAdornment>
//             )
//           }}
//         />
//         <Grid container spacing={1.5}>
//           {keys.flat().map(k => (
//             <Grid item xs={4} key={k}>
//               <Button fullWidth variant="contained" onClick={() => press(k)} sx={{ py: 2, fontSize: 18, fontWeight: 700 }}>
//                 {k}
//               </Button>
//             </Grid>
//           ))}
//         </Grid>
//         <Stack direction="row" spacing={1.5}>
//           <Button onClick={onCall} startIcon={<PhoneInTalkIcon />} variant="contained" color="success" fullWidth sx={{ py: 1.25, fontWeight: 700 }}>Call</Button>
//           <Button onClick={onAddToQueue} startIcon={<AddIcon />} variant="outlined" color="primary" fullWidth sx={{ py: 1.25, fontWeight: 700 }}>Queue</Button>
//         </Stack>
//       </Stack>
//     </Paper>
//   );
// };

const DialPad: React.FC<{
  value: string;
  onChange: (v: string) => void;
  onCall: () => void;
  onBackspace: () => void;
  onAddToQueue: () => void;
}> = ({ value, onChange, onCall, onBackspace, onAddToQueue }) => {
  const theme = useTheme();
  const keys = useMemo(
    () => [
      ['1', '2', '3'],
      ['4', '5', '6'],
      ['7', '8', '9'],
      ['0'],
    ],
    []
  );

  const press = (k: string) => onChange(cleanNumber(value + k));

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 4,
        // maxWidth: 360,
        mx: 'auto',
        bgcolor: theme.palette.mode === 'dark' ? '#1e272e' : '#ffffff',
        boxShadow: '0 6px 18px rgba(0,0,0,0.08)',
      }}
    >
      <Stack spacing={3} alignItems="center">
        {/* Number Input */}
        <TextField
          fullWidth
          size="medium"
          value={value}
          onChange={(e) => onChange(cleanNumber(e.target.value))}
          placeholder="Enter number"
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 3,
              fontSize: 20,
              fontWeight: 600,
              letterSpacing: 1,
              textAlign: 'center',
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">+</InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip title="Backspace">
                  <IconButton onClick={onBackspace} size="large">
                    <BackspaceIcon />
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            ),
          }}
        />

        {/* Dialpad */}
        <Grid container spacing={2} justifyContent="center">
          {keys.flat().map((k) => (
            <Grid item xs={4} key={k} display="flex" justifyContent="center">
              <Button
                onClick={() => press(k)}
                variant="outlined"
                sx={{
                  width: 70,
                  height: 70,
                  borderRadius: '50%',
                  fontSize: 22,
                  fontWeight: 700,
                }}
              >
                {k}
              </Button>
            </Grid>
          ))}
        </Grid>

        {/* Action Buttons */}
        <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
          <Button
            onClick={onCall}
            startIcon={<PhoneInTalkIcon />}
            variant="contained"
            color="success"
            fullWidth
            sx={{
              py: 1.5,
              fontWeight: 700,
              borderRadius: 3,
              fontSize: 16,
            }}
          >
            Call
          </Button>
          <Button
            onClick={onAddToQueue}
            startIcon={<AddIcon />}
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              py: 1.5,
              fontWeight: 700,
              borderRadius: 3,
              fontSize: 16,
            }}
          >
            Queue
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
};



// ---------- Queue Panel ----------
const QueuePanel: React.FC<{
  queue: QueueItem[];
  running: boolean;
  onStart: () => void;
  onPause: () => void;
  onClear: () => void;
  onUpload: (items: QueueItem[]) => void;
}> = ({ queue, running, onStart, onPause, onClear, onUpload }) => {
  const theme = useTheme();
  const fileRef = useRef<HTMLInputElement | null>(null);

  const handleFile = async (file: File) => {
    const textTypes = ['text/csv', 'text/plain'];
    if (file && (file.name.endsWith('.csv') || textTypes.includes(file.type))) {
      const text = await file.text();
      const rows = text.split(/\r?\n/).map(r => cleanNumber(r.trim())).filter(Boolean);
      const items: QueueItem[] = rows.map((n, idx) => ({ id: `${Date.now()}-${idx}`, number: n }));
      onUpload(items);
      return;
    }
    // Try XLSX via dynamic import (SheetJS)
    try {
      const XLSX = await import('xlsx');
      const data = await file.arrayBuffer();
      const wb = XLSX.read(data);
      const ws = wb.Sheets[wb.SheetNames[0]];
      const json: any[] = XLSX.utils.sheet_to_json(ws, { header: 1 });
      const flat = json.flat().map((v: any) => cleanNumber(String(v))).filter(Boolean);
      const items: QueueItem[] = flat.map((n, idx) => ({ id: `${Date.now()}-${idx}`, number: n }));
      onUpload(items);
    } catch (e) {
      alert('Unsupported file. Please upload CSV or Excel (.xlsx/.xls).');
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 2, borderRadius: 3, bgcolor: theme.palette.mode === 'dark' ? '#263238' : '#f5f7fa', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <QueueIcon sx={{ color: '#1976d2' }} />
          <Typography variant="subtitle1" fontWeight={700}>Queue ({queue.length})</Typography>
        </Stack>
        <Stack direction="row" spacing={1}>
          {running ? (
            <Button onClick={onPause} startIcon={<PauseCircleIcon />} variant="outlined">Pause</Button>
          ) : (
            <Button onClick={onStart} startIcon={<PlayCircleIcon />} variant="contained">Start</Button>
          )}
          <input ref={fileRef} type="file" accept=".csv, .xlsx, .xls, text/csv" hidden onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
            if (fileRef.current) fileRef.current.value = '';
          }} />
          <Button variant="outlined" startIcon={<UploadFileIcon />} onClick={() => fileRef.current?.click()}>Upload</Button>
          <Button color="error" variant="outlined" startIcon={<ClearAllIcon />} onClick={onClear}>Clear</Button>
        </Stack>
      </Stack>

      <Divider sx={{ my: 1 }} />

      <Box sx={{ flex: 1, overflowY: 'auto' }}>
        <List dense>
          <AnimatePresence initial={false}>
            {queue.map((q, idx) => (
              <motion.div key={q.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                <ListItem sx={{ borderRadius: 2, mb: 0.5, bgcolor: idx === 0 ? 'action.hover' : 'transparent' }}>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: '#1976d2' }}>{getInitials(q.name)}</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={<span style={{ fontWeight: 600 }}>{q.number}</span>} secondary={idx === 0 ? 'Up next' : undefined} />
                </ListItem>
              </motion.div>
            ))}
          </AnimatePresence>
        </List>
      </Box>
    </Paper>
  );
};

// ---------- History Panel ----------
const HistoryPanel: React.FC<{ items: CallRecord[] }> = ({ items }) => {
  const theme = useTheme();
  return (
    <Paper elevation={2} sx={{ p: 2, borderRadius: 3, bgcolor: theme.palette.mode === 'dark' ? '#263238' : '#f5f7fa', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <HistoryIcon sx={{ color: '#1976d2', mr: 1 }} />
        <Typography variant="subtitle1" fontWeight={700}>Call History</Typography>
      </Box>
      <List dense sx={{ flex: 1, overflowY: 'auto' }}>
        <AnimatePresence initial={false}>
          {items.map((call) => (
            <motion.div key={call.id} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}>
              <ListItem sx={{ borderRadius: 2, mb: 0.5, '&:hover': { bgcolor: 'action.hover' } }}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: call.status === 'answered' || call.status === 'ended' ? 'success.main' : 'error.main' }}>
                    <CallReceivedIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={<span style={{ fontWeight: 600 }}>{call.number} <span style={{ color: '#888', fontWeight: 400, fontSize: 14 }}>• {call.status}{call.durationSec ? ` • ${formatDuration(call.durationSec)}` : ''}</span></span>}
                  secondary={call.time}
                />
              </ListItem>
            </motion.div>
          ))}
        </AnimatePresence>
      </List>
    </Paper>
  );
};

// ---------- Main Page ----------
const DialerPage: React.FC = () => {
  const [dial, setDial] = useState('');
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [history, setHistory] = useState<CallRecord[]>([]);

  // Incoming / Active Call State
  const [ringing, setRinging] = useState<null | { number: string; name?: string }>(null);
  const [inCall, setInCall] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef<number | null>(null);

  // Auto dialer
  const [running, setRunning] = useState(false);
  const cycleRef = useRef<number | null>(null);

  // Tick timer for active call
  useEffect(() => {
    if (inCall) {
      timerRef.current = window.setInterval(() => setElapsed(s => s + 1), 1000);
    } else if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
      setElapsed(0);
    }
    return () => { if (timerRef.current) window.clearInterval(timerRef.current); };
  }, [inCall]);

  const startIncoming = useCallback((num: string, name?: string) => {
    setRinging({ number: num, name });
    setInCall(false);
  }, []);

  const endCallToHistory = useCallback((status: CallRecord['status'], number: string, durationSec?: number) => {
    setHistory(h => [{ id: `${Date.now()}-${Math.random()}`, number, time: dayjs().format('MMM D, YYYY • hh:mm A'), status, durationSec }, ...h]);
  }, []);

  const handleAnswer = () => {
    setInCall(true);
  };

  const handleDecline = () => {
    const num = ringing?.number || dial;
    if (inCall) {
      endCallToHistory('ended', num, elapsed);
    } else {
      endCallToHistory('declined', num);
    }
    setInCall(false);
    setRinging(null);
    setElapsed(0);
  };

  // Manual call from dial pad
  const manualCall = () => {
    const num = cleanNumber(dial);
    if (!num) return;
    startIncoming(num);
  };

  const addToQueue = () => {
    const num = cleanNumber(dial);
    if (!num) return;
    setQueue(q => [...q, { id: `${Date.now()}-${Math.random()}`, number: num }]);
    setDial('');
  };

  const onUpload = (items: QueueItem[]) => setQueue(q => [...q, ...items]);

  const clearQueue = () => setQueue([]);

  // Auto-dial loop: rings the next number, waits, simulates auto-answer for demo
  useEffect(() => {
    if (!running || inCall || ringing) return; // wait until no active/ringing
    if (queue.length === 0) return; // nothing to do

    const [next, ...rest] = queue;
    setQueue(rest);
    startIncoming(next.number, next.name);

    const timeout = window.setTimeout(() => {
      if (!inCall) {
        endCallToHistory('missed', next.number);
        setRinging(null);
      }
    }, 12000);

    return () => window.clearTimeout(timeout);
  }, [running, queue, inCall, ringing, startIncoming, endCallToHistory]);

  const handleStart = () => setRunning(true);
  const handlePause = () => setRunning(false);

  const simulateIncoming = () => startIncoming('+91 9876543210', 'Shabaz');

  return (
    <Box sx={{
      display: 'grid',
      gridTemplateColumns: { xs: '1fr', md: '1.1fr 0.9fr' },
      gridTemplateRows: { xs: 'auto auto auto', md: 'auto auto' },
      gap: 2,
      p: 2,
      height: '100vh', // Ensure the height is set to the viewport height
      overflow: 'auto', // Enable scrolling for overflowing content
      boxSizing: 'border-box'
    }}>

      {/* Left column: Incoming/Active + Dialpad */}
      <Box sx={{ display: 'grid', gridTemplateRows: 'auto auto', gap: 2 }}>
        <AnimatePresence mode="popLayout">
          {ringing ? (
            <motion.div key="incoming" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
              <IncomingCall
                number={ringing.number}
                name={ringing.name}
                onAnswer={handleAnswer}
                onDecline={handleDecline}
                inCall={inCall}
                elapsedSec={elapsed}
              />
            </motion.div>
          ) : (
            <motion.div key="idle" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
              <Paper sx={{ p: 2, borderRadius: 3 }}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <PhoneInTalkIcon color="primary" />
                  <Typography variant="subtitle1" fontWeight={700}>Ready to Call</Typography>
                  <Box sx={{ flex: 1 }} />
                  <Tooltip title="Simulate Incoming">
                    <Button size="small" onClick={simulateIncoming}>Simulate Incoming</Button>
                  </Tooltip>
                </Stack>
                <LinearProgress variant="determinate" value={inCall ? 100 : 0} sx={{ mt: 1, borderRadius: 2, height: 8 }} />
              </Paper>
            </motion.div>
          )}
        </AnimatePresence>

        <DialPad
          value={dial}
          onChange={setDial}
          onBackspace={() => setDial(d => d.slice(0, -1))}
          onCall={manualCall}
          onAddToQueue={addToQueue}
        />
      </Box>

      <Box sx={{ display: 'grid', gridTemplateRows: 'minmax(260px, 1fr) minmax(260px, 1fr)', gap: 6 }}>
        <QueuePanel
          queue={queue}
          running={running}
          onStart={handleStart}
          onPause={handlePause}
          onClear={clearQueue}
          onUpload={onUpload}
        />
        <HistoryPanel items={history} />
      </Box>
    </Box>
  );
};

export default DialerPage;








// import React, { useEffect, useRef, useState } from 'react';
// import { Box, Typography, Paper, List, ListItem, ListItemAvatar, Avatar, ListItemText, useTheme, Button, Stack, Chip } from '@mui/material';
// import CallReceivedIcon from '@mui/icons-material/CallReceived';
// import HistoryIcon from '@mui/icons-material/History';
// import CallEndIcon from '@mui/icons-material/CallEnd';
// import CallIcon from '@mui/icons-material/Call';

// const incomingCall = {
//   number: '+91 9876543210',
//   time: '09:30 AM',
//   name: 'Shabaz',
//   avatar: '',
// };

// const callHistory = [
//   { number: '+91 9123456789', time: 'Yesterday', name: 'Sathis Kumar' },
//   { number: '+91 9988776655', time: '2 days ago', name: 'Vishal Dev' },
//   { number: '+91 9001122334', time: '3 days ago', name: 'Shabaz Ali' },
//   { number: '+91 9001122334', time: '3 days ago', name: 'Anand' },
//   { number: '+91 9001122334', time: '3 days ago', name: 'Anand' },
//   { number: '+91 9001122334', time: '3 days ago', name: 'Anand' },
//   { number: '+91 9001122334', time: '3 days ago', name: 'Anand' },
//   { number: '+91 9001122334', time: '3 days ago', name: 'Anand' },
//   { number: '+91 9001122334', time: '3 days ago', name: 'Anand' },
//   { number: '+91 9001122334', time: '3 days ago', name: 'Anand' },
//   { number: '+91 9001122334', time: '3 days ago', name: 'Anand' },
//   { number: '+91 9001122334', time: '3 days ago', name: 'Anand' },
//   { number: '+91 9001122334', time: '3 days ago', name: 'Anand' },
//   { number: '+91 9001122334', time: '3 days ago', name: 'Anand' },
//   { number: '+91 9001122334', time: '3 days ago', name: 'Anand' },
//   { number: '+91 9001122334', time: '3 days ago', name: 'Anand' },
// ];

// const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase();

// const IncomingCall: React.FC<{ onAnswer: () => void; onDecline: () => void; }> = ({ onAnswer, onDecline }) => {
//   const theme = useTheme();
//   const [callStatus, setCallStatus] = useState<'ringing' | 'in-call'>('ringing');
//   const [seconds, setSeconds] = useState(0);
//   const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

//   useEffect(() => {
//     if (callStatus === 'in-call') {
//       timerRef.current = setInterval(() => setSeconds(s => s + 1), 1000);
//     } else {
//       setSeconds(0);
//       if (timerRef.current) clearInterval(timerRef.current);
//     }
//     return () => { if (timerRef.current) clearInterval(timerRef.current); };
//   }, [callStatus]);

//   const handleAnswer = () => {
//     setCallStatus('in-call');
//     onAnswer();
//   };
//   const handleDecline = () => {
//     setCallStatus('ringing');
//     setSeconds(0);
//     onDecline();
//   };

//   const formatTime = (s: number) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;

//   return (
//     <Paper elevation={4} sx={{
//       // p: { xs: 2, sm: 3 },
//       borderRadius: 3,
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//       justifyContent: 'center',
//       gap: 1,
//       bgcolor: theme.palette.mode === 'dark' ? '#263238' : '#e8f5e9',
//       width: '100%',
//       height: '100%',
//       boxShadow: '0 8px 32px 0 rgba(67,160,71,0.13)',
//       position: 'relative',
//       overflow: 'hidden',
//     }}>
//       <Avatar sx={{ bgcolor: '#43a047', width: 64, height: 64, mb: 1 }}>
//         <CallReceivedIcon fontSize="large" />
//       </Avatar>
//       <Typography variant="h6" fontWeight={700} color="text.primary" align="center">
//         {incomingCall.name}
//       </Typography>
//       <Typography variant="body1" color="text.secondary" fontWeight={500} align="center">
//         {incomingCall.number}
//       </Typography>
//       <Chip
//         label={callStatus === 'in-call' ? `In Call • ${formatTime(seconds)}` : 'Ringing...'}
//         color={callStatus === 'in-call' ? 'success' : 'primary'}
//         sx={{ mt: 1, fontWeight: 600, fontSize: 16, px: 2, py: 1, borderRadius: 2 }}
//       />
//       <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
//         {incomingCall.time}
//       </Typography>
//       <Stack direction="row" spacing={3} mt={2}>
//         {callStatus === 'ringing' ? (
//           <>
//             <Button
//               variant="contained"
//               color="success"
//               startIcon={<CallIcon />}
//               onClick={handleAnswer}
//               sx={{ minWidth: 110, fontWeight: 600, fontSize: 16 }}
//             >
//               Answer
//             </Button>
//             <Button
//               variant="contained"
//               color="error"
//               startIcon={<CallEndIcon />}
//               onClick={handleDecline}
//               sx={{ minWidth: 110, fontWeight: 600, fontSize: 16 }}
//             >
//               Decline
//             </Button>
//           </>
//         ) : (
//           <Button
//             variant="contained"
//             color="error"
//             startIcon={<CallEndIcon />}
//             onClick={handleDecline}
//             sx={{ minWidth: 180, fontWeight: 600, fontSize: 16 }}
//           >
//             End Call
//           </Button>
//         )}
//       </Stack>
//     </Paper>
//   );
// };

// const CallHistory: React.FC = () => {
//   const theme = useTheme();
//   return (
//     <Paper elevation={2} sx={{
//       p: 2,
//       borderRadius: 3,
//       bgcolor: theme.palette.mode === 'dark' ? '#263238' : '#f5f7fa',
//       height: '100%',
//       mt: 1,
//       overflowY: 'auto',
//       display: 'flex',
//       flexDirection: 'column',
//     }}>
//       <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//         <HistoryIcon sx={{ color: '#1976d2', mr: 1 }} />
//         <Typography variant="subtitle1" fontWeight={600} color="primary">
//           Call History
//         </Typography>
//       </Box>
//       <List dense sx={{ flex: 1 }}>
//         {callHistory.map((call, idx) => (
//           <ListItem key={idx} sx={{ borderRadius: 2, mb: 0.5, '&:hover': { bgcolor: '#e3f2fd' } }}>
//             <ListItemAvatar>
//               <Avatar sx={{ bgcolor: '#1976d2' }}>
//                 <CallReceivedIcon />
//               </Avatar>
//             </ListItemAvatar>
//             <ListItemText
//               primary={<span style={{ fontWeight: 500 }}>{call.name} <span style={{ color: '#888', fontWeight: 400, fontSize: 15 }}>({call.number})</span></span>}
//               secondary={call.time}
//             />
//           </ListItem>
//         ))}
//       </List>
//     </Paper>
//   );
// };

// const DailerPage: React.FC = () => {
//   const handleAnswer = () => {
//     // alert('Call answered!');
//   };
//   const handleDecline = () => {
//     // alert('Call declined!');
//   };

//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'flex-start',
//         padding: 1,
//         height: '100%',
//         borderRadius: 4,
//         maxWidth: 500,
//         mx: 'auto',
//         width: '100%',
//         boxSizing: 'border-box',
//       }}
//     >
//       <Box sx={{ flex: 1, width: '100%', minHeight: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
//         <IncomingCall onAnswer={handleAnswer} onDecline={handleDecline} />
//       </Box>
//       <Box sx={{ flex: 1, width: '100%', minHeight: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
//         <CallHistory />
//       </Box>
//     </Box>
//   );
// };

// export default DailerPage;