import { Box, Grid, CircularProgress } from '@mui/material';
import { useWati } from '../../context/WatiContext.types';
import LeftMenu from './LeftMenu';
import RightMenu from './RightMenu';

const HomePageContent: React.FC = () => {
    const { loading } = useWati();
    return (
        loading ? (
            <Box display="flex" alignItems="center" justifyContent="center" height="100vh" width="100vw">
                <CircularProgress size={64} thickness={5} />
            </Box>
        ) : (
            <Box sx={{ width: '100%', background: '#f5f7fa', marginBottom: 200 }}>
                <Grid container spacing={0} sx={{ height: '97vh', width: '100%' }}>
                    <Grid sx={{ height: '100%', width: '20%' }}>
                        <LeftMenu />
                    </Grid>
                    <Grid sx={{ height: '100%', width: '80%', background: 'yellow' }}>
                        <RightMenu />
                    </Grid>
                </Grid>
            </Box>
        )
    );
};

const HomePage: React.FC = () => (
    <HomePageContent />

);

export default HomePage;

