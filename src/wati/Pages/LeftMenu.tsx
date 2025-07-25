import { Avatar, Box, Typography } from '@mui/material';
import { useWati } from '../../context/WatiContext.types';

const LeftMenu: React.FC = () => {
    const { chatLists, setSelectedChatMobileNumber } = useWati();
    return (
        <Box sx={{
            borderRadius: 1,
            overflowY: 'auto',
            width: '100%',
            height: '100%',
            boxShadow: 2
        }}>
            {chatLists.map((item) => (
                <Box
                    key={item.phone}
                    sx={{
                        paddingY: 1,
                        borderBottom: '1px solid #e0e0e0',
                        display: 'flex',
                        gap: 2,
                        width: '100%',
                        height: 'max-content',
                        cursor: 'pointer',
                        alignItems: 'flex-start',
                        ':hover': {
                            boxShadow: '0 0 0 5px rgba(78, 84, 200, 0.08)',
                            transition: 'all 0.2s ease-in-out'
                        },
                        ':active': {
                            transform: 'scale(0.97)',
                            transition: 'transform 0.1s ease-in-out'
                        }
                    }}
                    onClick={() => setSelectedChatMobileNumber(item.phone)}
                >
                    <Avatar
                        sx={{
                            ml:2,
                            background: 'none',
                            border: '1px solid #4e54c8',
                            color: '#4e54c8',
                        }}
                    />
                    <Box
                        sx={{
                            width: '100%',
                            overflow: 'hidden',
                        }}
                    >
                        <Typography fontSize={14} width={'100%'} sx={{ color: '#222', fontWeight: 500 }}>
                            {item.fullName}
                        </Typography>
                        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                            <Typography sx={{
                                width: '70%',
                                overflowX: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                color: '#888'
                            }}>
                                ....
                            </Typography>
                            <Typography fontSize={11} sx={{ width: '25%', display: 'flex', color: '#888' }}>
                                {new Date(item.lastUpdated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            ))}
        </Box>
    );
};

export default LeftMenu; 