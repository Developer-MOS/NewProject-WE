// import React, { useEffect, useState } from 'react';
// import {
//   Box,
//   Typography,
//   Paper,
//   Card,
//   CardContent,
//   Grid,
//   CircularProgress,
//   Alert,
//   Button,
//   Divider,
//   MenuItem,
//   Select,
//   FormControl,
//   InputLabel,
// } from '@mui/material';
// import DownloadIcon from '@mui/icons-material/Download';
// import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

// const mockWatiStats = {
//   avgResponseTime: '2m 15s',
//   totalTickets: 120,
//   statusOverview: { open: 15, pending: 10, closed: 95 },
//   timeBased: {
//     daily: { responded: 10, open: 2, closed: 8 },
//     weekly: { responded: 60, open: 5, closed: 55 },
//     monthly: { responded: 120, open: 15, closed: 105 },
//   },
//   category: {
//     Data: 20,
//     Android: 18,
//     IOS: 15,
//     Backend: 22,
//     Dispatches: 10,
//     'Prospecting inquires': 20,
//     Refund: 15,
//   },
// };

// const mockCallStats = {
//   avgResponseTime: '1m 40s',
//   totalCalls: 80,
//   statusOverview: { missed: 5, ongoing: 3, completed: 72 },
//   timeBased: {
//     daily: { responded: 8, missed: 1, completed: 7 },
//     weekly: { responded: 50, missed: 3, completed: 47 },
//     monthly: { responded: 80, missed: 5, completed: 75 },
//   },
//   category: {
//     Support: 30,
//     Sales: 20,
//     Marketing: 15,
//     Other: 15,
//   },
// };

// const mockEmailStats = {
//   avgResponseTime: '3m 05s',
//   totalEmails: 200,
//   statusOverview: { unread: 20, replied: 150, archived: 30 },
//   timeBased: {
//     daily: { replied: 15, unread: 3, archived: 2 },
//     weekly: { replied: 90, unread: 10, archived: 20 },
//     monthly: { replied: 150, unread: 20, archived: 30 },
//   },
//   category: {
//     Queries: 50,
//     Complaints: 40,
//     Feedback: 30,
//     Updates: 80,
//   },
// };


// const COLORS = ['#8884d8', '#ffc658', '#82ca9d'];

// const exportToCSV = (data: any) => {
//   const rows = [
//     ['Metric', 'Value'],
//     ['Average Response Time', data.avgResponseTime],
//     ['Total Tickets Responded', data.totalTickets],
//     ['Open Tickets', data.statusOverview.open],
//     ['Pending Tickets', data.statusOverview.pending],
//     ['Closed Tickets', data.statusOverview.closed],
//     ['Daily Responded', data.timeBased.daily.responded],
//     ['Weekly Responded', data.timeBased.weekly.responded],
//     ['Monthly Responded', data.timeBased.monthly.responded],
//     ...Object.entries(data.category).map(([cat, val]) => [`Category: ${cat}`, val]),
//   ];
//   const csvContent =
//     'data:text/csv;charset=utf-8,' +
//     rows.map((e) => e.join(',')).join('\n');
//   const encodedUri = encodeURI(csvContent);
//   const link = document.createElement('a');
//   link.setAttribute('href', encodedUri);
//   link.setAttribute('download', 'wati_stats.csv');
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
// };

// const StaticsPage: React.FC = () => {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [watiStats, setWatiStats] = useState<typeof mockWatiStats | null>(null);
//   const [timeView, setTimeView] = useState<'daily' | 'weekly' | 'monthly'>('daily');

//   useEffect(() => {
//     setLoading(true);
//     setError(null);
//     setTimeout(() => {
//       setWatiStats(mockWatiStats);
//       setLoading(false);
//     }, 1200);
//   }, []);

//   const ticketStatusData = [
//     { name: 'Open', value: watiStats?.statusOverview.open || 0 },
//     { name: 'Pending', value: watiStats?.statusOverview.pending || 0 },
//     { name: 'Closed', value: watiStats?.statusOverview.closed || 0 },
//   ];

//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         height: '100vh',
//         width: '100%',
//         bgcolor: '#f8f9fa',
//         borderRadius: 4,
//         overflowY: 'auto',
//       }}
//     >
//       {/* Wati Stats */}
//       <Paper
//         elevation={2}
//         sx={{
//           p: 3,
//           mb: 2,
//           borderRadius: 2,
//           background: '#fff',
//           boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)',
//         }}
//       >
//         <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
//           <Typography variant="h5" fontWeight={700} color="primary">
//             Wati Stats
//           </Typography>
//           <Button
//             variant="contained"
//             color="primary"
//             startIcon={<DownloadIcon />}
//             onClick={() => watiStats && exportToCSV(watiStats)}
//             disabled={loading || !!error}
//             size="small"
//           >
//             Export
//           </Button>
//         </Box>
//         {loading ? (
//           <Box display="flex" justifyContent="center" alignItems="center" minHeight={120}>
//             <CircularProgress color="primary" />
//           </Box>
//         ) : error ? (
//           <Alert severity="error">{error}</Alert>
//         ) : watiStats ? (

//           <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'row' }}>

//             <Grid sx={{ width: '32%' }} item xs={4} sm={6} md={6}>
//               <Card
//                 variant="outlined"
//                 sx={{
//                   borderRadius: 2,
//                   boxShadow: 'none',
//                   borderColor: '#e0e0e0',
//                   minHeight: 140,
//                   height: 140,
//                   width: '100%',
//                   display: 'flex',
//                   flexDirection: 'column',
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                 }}
//               >
//                 <CardContent sx={{ width: '100%', textAlign: 'center', p: 2 }}>
//                   <Typography variant="subtitle2" color="text.secondary">
//                     Average Response Time
//                   </Typography>
//                   <Typography variant="h6" fontWeight={600}>
//                     {watiStats.avgResponseTime}
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>

//             {/* Total Tickets Responded */}
//             <Grid sx={{ width: '32%' }} item xs={4} sm={6} md={6}>
//               <Card
//                 variant="outlined"
//                 sx={{
//                   borderRadius: 2,
//                   boxShadow: 'none',
//                   borderColor: '#e0e0e0',
//                   minHeight: 140,
//                   height: 140,
//                   display: 'flex',
//                   flexDirection: 'column',
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                 }}
//               >
//                 <CardContent sx={{ width: '100%', textAlign: 'center', p: 2 }}>
//                   <Typography variant="subtitle2" color="text.secondary">
//                     Total Tickets Responded
//                   </Typography>
//                   <Typography variant="h6" fontWeight={600}>
//                     {watiStats.totalTickets}
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>

//             {/* Ticket Status Overview */}
//             <Grid sx={{ width: '32%' }} item xs={4} sm={6} md={6}>
//               <Card
//                 variant="outlined"
//                 sx={{
//                   borderRadius: 2,
//                   boxShadow: 'none',
//                   borderColor: '#e0e0e0',
//                   minHeight: 140,
//                   height: 140,
//                   display: 'flex',
//                   flexDirection: 'column',
//                   justifyContent: 'center',
//                 }}
//               >
//                 <CardContent sx={{ width: '100%', p: 2 }}>
//                   <Typography variant="subtitle2" color="text.secondary" mb={1}>
//                     Ticket Status Overview
//                   </Typography>
//                   <Grid container spacing={2} justifyContent="center" alignItems="center">
//                     <Grid item xs={4} sx={{ textAlign: 'center' }}>
//                       <Typography color="primary" fontWeight={600}>
//                         Open
//                       </Typography>
//                       <Typography>{watiStats.statusOverview.open}</Typography>
//                     </Grid>
//                     <Grid item xs={4} sx={{ textAlign: 'center' }}>
//                       <Typography color="warning.main" fontWeight={600}>
//                         Pending
//                       </Typography>
//                       <Typography>{watiStats.statusOverview.pending}</Typography>
//                     </Grid>
//                     <Grid item xs={4} sx={{ textAlign: 'center' }}>
//                       <Typography color="success.main" fontWeight={600}>
//                         Closed
//                       </Typography>
//                       <Typography>{watiStats.statusOverview.closed}</Typography>
//                     </Grid>
//                   </Grid>
//                 </CardContent>
//               </Card>
//             </Grid>


//             {/* Time-Based Tracking */}

//             <Grid item container xs={12} sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

//               <PieChart width={300} height={300}>
//                 <Pie
//                   data={ticketStatusData}
//                   cx="50%"
//                   cy="50%"
//                   labelLine={false}
//                   outerRadius={100}
//                   fill="#8884d8"
//                   dataKey="value"
//                 >
//                   {ticketStatusData.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//                 <Legend />
//               </PieChart>

//               <Grid item xs={6}>

//                 <Box display="flex" alignItems="center" gap={2} mb={1}>
//                   <Typography variant="subtitle2" color="text.secondary">
//                     Time-Based Tracking
//                   </Typography>
//                   <FormControl size="small" sx={{ minWidth: 120 }}>
//                     <InputLabel id="time-view-label">View</InputLabel>
//                     <Select
//                       labelId="time-view-label"
//                       value={timeView}
//                       label="View"
//                       onChange={(e) => setTimeView(e.target.value as any)}
//                     >
//                       <MenuItem value="daily">Daily</MenuItem>
//                       <MenuItem value="weekly">Weekly</MenuItem>
//                       <MenuItem value="monthly">Monthly</MenuItem>
//                     </Select>
//                   </FormControl>
//                 </Box>

//                 <Grid container spacing={2}>
//                   {['responded', 'open', 'closed'].map((key) => (
//                     <Grid item xs={4} key={key}>
//                       <Card
//                         variant="outlined"
//                         sx={{
//                           borderRadius: 2,
//                           boxShadow: 'none',
//                           borderColor: '#e0e0e0',
//                           minHeight: 100,
//                           width: 150,
//                           height: 100,
//                           display: 'flex',
//                           flexDirection: 'column',
//                           justifyContent: 'center',
//                           alignItems: 'center',
//                         }}
//                       >
//                         <CardContent sx={{ width: '100%', textAlign: 'center', p: 1 }}>
//                           <Typography
//                             color={
//                               key === 'responded'
//                                 ? 'primary'
//                                 : key === 'open'
//                                   ? 'warning.main'
//                                   : 'success.main'
//                             }
//                             fontWeight={600}
//                           >
//                             {key.charAt(0).toUpperCase() + key.slice(1)}
//                           </Typography>
//                           <Typography>
//                             {watiStats.timeBased[timeView][key as 'responded' | 'open' | 'closed']}
//                           </Typography>
//                         </CardContent>
//                       </Card>
//                     </Grid>
//                   ))}
//                 </Grid>

//               </Grid>

//             </Grid>


//             {/* Ticket Breakdown by Category */}
//             <Grid item xs={12}>
//               <Divider sx={{ my: 2 }} />
//               <Typography variant="subtitle2" color="text.secondary" mb={1}>
//                 Ticket Breakdown by Category
//               </Typography>
//               <Grid container spacing={2}>
//                 {Object.entries(watiStats.category).map(([cat, val]) => (
//                   <Grid
//                     item
//                     xs={12}
//                     sm={6}
//                     md={3}
//                     key={cat}
//                     sx={{
//                       display: 'flex',
//                     }}
//                   >
//                     <Card
//                       variant="outlined"
//                       sx={{
//                         borderRadius: 2,
//                         boxShadow: 'none',
//                         borderColor: '#e0e0e0',
//                         minHeight: 140, // Ensure consistent height
//                         height: 140,
//                         width: 200, // Ensure consistent width
//                         display: 'flex',
//                         flexDirection: 'column',
//                         justifyContent: 'center',
//                         alignItems: 'center',
//                       }}
//                     >
//                       <CardContent
//                         sx={{
//                           width: '100%',
//                           height: '100%',
//                           textAlign: 'center',
//                           p: 1,
//                           display: 'flex',
//                           flexDirection: 'column',
//                           justifyContent: 'center',
//                           alignItems: 'center',
//                         }}
//                       >
//                         <Typography fontWeight={600} color="text.primary" noWrap>
//                           {cat}
//                         </Typography>
//                         <Typography>{val}</Typography>
//                       </CardContent>
//                     </Card>
//                   </Grid>
//                 ))}
//               </Grid>
//             </Grid>
//           </Grid>
//         ) : null}
//       </Paper>

//       {/* Call Stats */}
//       <Paper elevation={2} sx={{ width: '100%', maxWidth: 700, p: 3, mb: 2, borderRadius: 2, background: '#fff', boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)' }}>
//         <Typography variant="h5" fontWeight={700} color="primary" mb={1}>
//           Call Stats
//         </Typography>
//         <Typography variant="body1" color="text.secondary">
//           This section will display Call statistics.
//         </Typography>
//       </Paper>

//       {/* Email Stats */}
//       <Paper elevation={2} sx={{ width: '100%', maxWidth: 700, p: 3, borderRadius: 2, background: '#fff', boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)' }}>
//         <Typography variant="h5" fontWeight={700} color="primary" mb={1}>
//           Email Stats
//         </Typography>
//         <Typography variant="body1" color="text.secondary">
//           {/* Add Email stats content here */}
//           This section will display Email statistics.
//         </Typography>
//       </Paper>
//     </Box>
//   );
// };

// export default StaticsPage;







import React, { useState, useEffect } from "react";
import {
  Box, Typography, Paper, Button, CircularProgress,
  Alert, Grid, Card, CardContent, Divider,
  FormControl, InputLabel, MenuItem, Select
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";


const mockWatiStats = {
  avgResponseTime: '2m 15s',
  totalTickets: 120,
  statusOverview: { open: 15, pending: 10, closed: 95 },
  timeBased: {
    daily: { responded: 10, open: 2, closed: 8 },
    weekly: { responded: 60, open: 5, closed: 55 },
    monthly: { responded: 120, open: 15, closed: 105 },
  },
  category: {
    Data: 20,
    Android: 18,
    IOS: 15,
    Backend: 22,
    Dispatches: 10,
    'Prospecting inquires': 20,
    Refund: 15,
  },
};

const mockCallStats = {
  avgResponseTime: '1m 40s',
  totalCalls: 80,
  statusOverview: { missed: 5, ongoing: 3, completed: 72 },
  timeBased: {
    daily: { responded: 8, missed: 1, completed: 7 },
    weekly: { responded: 50, missed: 3, completed: 47 },
    monthly: { responded: 80, missed: 5, completed: 75 },
  },
  category: {
    Support: 30,
    Sales: 20,
    Marketing: 15,
    Other: 15,
  },
};

const mockEmailStats = {
  avgResponseTime: '3m 05s',
  totalEmails: 200,
  statusOverview: { unread: 20, replied: 150, archived: 30 },
  timeBased: {
    daily: { replied: 15, unread: 3, archived: 2 },
    weekly: { replied: 90, unread: 10, archived: 20 },
    monthly: { replied: 150, unread: 20, archived: 30 },
  },
  category: {
    Queries: 50,
    Complaints: 40,
    Feedback: 30,
    Updates: 80,
  },
};


const COLORS = ["#8884d8", "#ffc658", "#82ca9d"];

// Reusable Stats Section
const StatsSection = ({
  title,
  stats,
  loading,
  error,
  exportHandler,
  timeView,
  setTimeView,
  selectedStat,
  setSelectedStat,
}: any) => {
  if (loading) {
    return (

      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          // backgroundColor: 'rgba(255, 255, 255, 0.9)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999,
        }}
      >
        <CircularProgress size={70} thickness={4} />
      </Box>
      // <Paper sx={sectionStyle}>
      //   <Box display="flex" justifyContent="center" alignItems="center" minHeight={120}>
      //     <CircularProgress color="primary" />
      //   </Box>
      // </Paper>
    );
  }

  if (error) {
    return (
      <Paper sx={sectionStyle}>
        <Alert severity="error">{error}</Alert>
      </Paper>
    );
  }

  if (!stats) return null;

  const ticketStatusData = Object.entries(stats.statusOverview).map(
    ([key, value]) => ({ name: key, value })
  );

  const exportToCSV = (data: any) => {
    const rows = [
      ['Metric', 'Value'],
      ['Average Response Time', data.avgResponseTime],
      ['Total Tickets Responded', data.totalTickets],
      ['Open Tickets', data.statusOverview.open],
      ['Pending Tickets', data.statusOverview.pending],
      ['Closed Tickets', data.statusOverview.closed],
      ['Daily Responded', data.timeBased.daily.responded],
      ['Weekly Responded', data.timeBased.weekly.responded],
      ['Monthly Responded', data.timeBased.monthly.responded],
      ...Object.entries(data.category).map(([cat, val]) => [`Category: ${cat}`, val]),
    ];
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      rows.map((e) => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'wati_stats.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100vh',
        width: '100%',
        bgcolor: '#f8f9fa',
        borderRadius: 4,
        overflowY: 'auto',
      }}
    >
      {/* Wati Stats */}
      <Paper
        elevation={2}
        sx={{
          p: 3,
          mb: 2,
          borderRadius: 2,
          background: '#fff',
          boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)',
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <Box
            display='flex'
            gap={2}
          >
            <Typography variant="h5" fontWeight={700} color="primary">
              {selectedStat} Stats
            </Typography>
            <FormControl size="small" sx={{ mb: 2, minWidth: 200 }}>
              <Select value={selectedStat} onChange={(e) => setSelectedStat(e.target.value)}>
                <MenuItem value="Wati">Wati Stats</MenuItem>
                <MenuItem value="Call">Call Stats</MenuItem>
                <MenuItem value="Email">Email Stats</MenuItem>
              </Select>
            </FormControl>
          </Box>
          {/* <Button
            variant="contained"
            color="primary"
            startIcon={<DownloadIcon />}
            onClick={() => stats && exportToCSV(stats)}
            disabled={loading || !!error}
            size="small"
          >
            Export
          </Button> */}
        </Box>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight={120}>
            <CircularProgress color="primary" />
          </Box>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : stats ? (

          <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'row' }}>

            <Grid sx={{ width: '32%' }} item xs={4} sm={6} md={6}>
              <Card
                variant="outlined"
                sx={{
                  borderRadius: 2,
                  boxShadow: 'none',
                  borderColor: '#e0e0e0',
                  minHeight: 140,
                  height: 140,
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <CardContent sx={{ width: '100%', textAlign: 'center', p: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Average Response Time
                  </Typography>
                  <Typography variant="h6" fontWeight={600}>
                    {stats.avgResponseTime}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Total Tickets Responded */}
            <Grid sx={{ width: '32%' }} item xs={4} sm={6} md={6}>
              <Card
                variant="outlined"
                sx={{
                  borderRadius: 2,
                  boxShadow: 'none',
                  borderColor: '#e0e0e0',
                  minHeight: 140,
                  height: 140,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <CardContent sx={{ width: '100%', textAlign: 'center', p: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Total Tickets Responded
                  </Typography>
                  <Typography variant="h6" fontWeight={600}>
                    {stats.totalTickets}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Ticket Status Overview */}
            <Grid sx={{ width: '32%' }} item xs={4} sm={6} md={6}>
              <Card
                variant="outlined"
                sx={{
                  borderRadius: 2,
                  boxShadow: 'none',
                  borderColor: '#e0e0e0',
                  minHeight: 140,
                  height: 140,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <CardContent sx={{ width: '100%', p: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary" mb={1}>
                    Ticket Status Overview
                  </Typography>
                  <Grid container spacing={2} justifyContent="center" alignItems="center">
                    <Grid item xs={4} sx={{ textAlign: 'center' }}>
                      <Typography color="primary" fontWeight={600}>
                        Open
                      </Typography>
                      <Typography>{stats.statusOverview.open}</Typography>
                    </Grid>
                    <Grid item xs={4} sx={{ textAlign: 'center' }}>
                      <Typography color="warning.main" fontWeight={600}>
                        Pending
                      </Typography>
                      <Typography>{stats.statusOverview.pending}</Typography>
                    </Grid>
                    <Grid item xs={4} sx={{ textAlign: 'center' }}>
                      <Typography color="success.main" fontWeight={600}>
                        Closed
                      </Typography>
                      <Typography>{stats.statusOverview.closed}</Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>


            {/* Time-Based Tracking */}

            <Grid item container xs={12} sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

              <PieChart width={300} height={300}>
                <Pie
                  data={ticketStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {ticketStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>

              <Grid item xs={6}>

                <Box display="flex" alignItems="center" gap={2} mb={1}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Time-Based Tracking
                  </Typography>
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <InputLabel id="time-view-label">View</InputLabel>
                    <Select
                      labelId="time-view-label"
                      value={timeView}
                      label="View"
                      onChange={(e) => setTimeView(e.target.value as any)}
                    >
                      <MenuItem value="daily">Daily</MenuItem>
                      <MenuItem value="weekly">Weekly</MenuItem>
                      <MenuItem value="monthly">Monthly</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                <Grid container spacing={2}>
                  {['responded', 'open', 'closed'].map((key) => (
                    <Grid item xs={4} key={key}>
                      <Card
                        variant="outlined"
                        sx={{
                          borderRadius: 2,
                          boxShadow: 'none',
                          borderColor: '#e0e0e0',
                          minHeight: 100,
                          width: 150,
                          height: 100,
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <CardContent sx={{ width: '100%', textAlign: 'center', p: 1 }}>
                          <Typography
                            color={
                              key === 'responded'
                                ? 'primary'
                                : key === 'open'
                                  ? 'warning.main'
                                  : 'success.main'
                            }
                            fontWeight={600}
                          >
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                          </Typography>
                          <Typography>
                            {stats.timeBased[timeView][key as 'responded' | 'open' | 'closed']}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>

              </Grid>

            </Grid>


            {/* Ticket Breakdown by Category */}
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" color="text.secondary" mb={1}>
                Ticket Breakdown by Category
              </Typography>
              <Grid container spacing={2}>
                {Object.entries(stats.category).map(([cat, val]) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={3}
                    key={cat}
                    sx={{
                      display: 'flex',
                    }}
                  >
                    <Card
                      variant="outlined"
                      sx={{
                        borderRadius: 2,
                        boxShadow: 'none',
                        borderColor: '#e0e0e0',
                        minHeight: 140, // Ensure consistent height
                        height: 140,
                        width: 200, // Ensure consistent width
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <CardContent
                        sx={{
                          width: '100%',
                          height: '100%',
                          textAlign: 'center',
                          p: 1,
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <Typography fontWeight={600} color="text.primary" noWrap>
                          {cat}
                        </Typography>
                        <Typography>{val}</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        ) : null}
      </Paper>

    </Box>


    // <Paper sx={sectionStyle}>
    //   <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
    //     <Typography variant="h5" fontWeight={700} color="primary">
    //       {title}
    //     </Typography>
    //     <Button
    //       variant="contained"
    //       color="primary"
    //       startIcon={<DownloadIcon />}
    //       onClick={() => exportHandler(stats)}
    //       size="small"
    //     >
    //       Export
    //     </Button>
    //   </Box>

    //   <Grid container spacing={2}>
    //     {/* First row of cards */}
    //     {/* --- Copy the three small cards from original UI --- */}

    //     {/* Pie Chart & Time View */}
    //     <Grid item container xs={12} justifyContent="center" alignItems="center">
    //       <PieChart width={300} height={300}>
    //         <Pie
    //           data={ticketStatusData}
    //           cx="50%" cy="50%" outerRadius={100} fill="#8884d8"
    //           dataKey="value" labelLine={false}
    //         >
    //           {ticketStatusData.map((_, i) => (
    //             <Cell key={i} fill={COLORS[i % COLORS.length]} />
    //           ))}
    //         </Pie>
    //         <Tooltip />
    //         <Legend />
    //       </PieChart>

    //       {/* Time-Based Cards */}
    //       <Grid item xs={6}>
    //         <Box display="flex" alignItems="center" gap={2} mb={1}>
    //           <Typography variant="subtitle2" color="text.secondary">
    //             Time-Based Tracking
    //           </Typography>
    //           <FormControl size="small" sx={{ minWidth: 120 }}>
    //             <InputLabel id="time-view-label">View</InputLabel>
    //             <Select
    //               labelId="time-view-label"
    //               value={timeView}
    //               onChange={(e) => setTimeView(e.target.value)}
    //             >
    //               <MenuItem value="daily">Daily</MenuItem>
    //               <MenuItem value="weekly">Weekly</MenuItem>
    //               <MenuItem value="monthly">Monthly</MenuItem>
    //             </Select>
    //           </FormControl>
    //         </Box>

    //         <Grid container spacing={2}>
    //           {["responded", "open", "closed"].map((key) => (
    //             <Grid item xs={4} key={key}>
    //               <Card variant="outlined" sx={timeCardStyle}>
    //                 <CardContent sx={{ textAlign: "center", p: 1 }}>
    //                   <Typography
    //                     color={
    //                       key === "responded"
    //                         ? "primary"
    //                         : key === "open"
    //                           ? "warning.main"
    //                           : "success.main"
    //                     }
    //                     fontWeight={600}
    //                   >
    //                     {key}
    //                   </Typography>
    //                   <Typography>
    //                     {stats.timeBased[timeView][key]}
    //                   </Typography>
    //                 </CardContent>
    //               </Card>
    //             </Grid>
    //           ))}
    //         </Grid>
    //       </Grid>
    //     </Grid>

    //     {/* Category Breakdown */}
    //     <Grid item xs={12}>
    //       <Divider sx={{ my: 2 }} />
    //       <Typography variant="subtitle2" color="text.secondary" mb={1}>
    //         Ticket Breakdown by Category
    //       </Typography>
    //       <Grid container spacing={2}>
    //         {Object.entries(stats.category).map(([cat, val]) => (
    //           <Grid item xs={12} sm={6} md={3} key={cat}>
    //             <Card variant="outlined" sx={categoryCardStyle}>
    //               <CardContent sx={categoryContentStyle}>
    //                 <Typography fontWeight={600} noWrap>{cat}</Typography>
    //                 <Typography>{val}</Typography>
    //               </CardContent>
    //             </Card>
    //           </Grid>
    //         ))}
    //       </Grid>
    //     </Grid>
    //   </Grid>
    // </Paper>
  );
};

// Main Component
export default function StaticsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeView, setTimeView] = useState("daily");
  const [selectedStat, setSelectedStat] = useState("Wati");

  const statsMap: any = {
    Wati: mockWatiStats,
    Call: mockCallStats,
    Email: mockEmailStats,
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1200);
  }, [selectedStat]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", p: 3 }}>
      {/* <FormControl size="small" sx={{ mb: 2, minWidth: 200 }}>
        <InputLabel>Select Stats</InputLabel>
        <Select value={selectedStat} onChange={(e) => setSelectedStat(e.target.value)}>
          <MenuItem value="Wati">Wati Stats</MenuItem>
          <MenuItem value="Call">Call Stats</MenuItem>
          <MenuItem value="Email">Email Stats</MenuItem>
        </Select>
      </FormControl> */}

      <StatsSection
        title={`${selectedStat} Stats`}
        stats={statsMap[selectedStat]}
        loading={loading}
        error={error}
        exportHandler={() => { }} // Reuse your CSV export function
        timeView={timeView}
        setTimeView={setTimeView}
        selectedStat={selectedStat}
        setSelectedStat={setSelectedStat}
      />
    </Box>
  );
}

// Styles
const sectionStyle = {
  p: 3,
  mb: 2,
  borderRadius: 2,
  background: "#fff",
  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
};

// const timeCardStyle = {
//   borderRadius: 2,
//   boxShadow: "none",
//   borderColor: "#e0e0e0",
//   minHeight: 100,
//   width: 150,
//   height: 100,
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
// };

// const categoryCardStyle = {
//   borderRadius: 2,
//   boxShadow: "none",
//   borderColor: "#e0e0e0",
//   minHeight: 140,
//   height: 140,
//   width: 200,
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
// };

// const categoryContentStyle = {
//   textAlign: "center",
//   p: 1,
//   display: "flex",
//   flexDirection: "column",
//   justifyContent: "center",
//   alignItems: "center",
// };
