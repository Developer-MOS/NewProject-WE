import { Avatar, Box, IconButton, Typography, TextField } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SendIcon from '@mui/icons-material/Send';
import { useWati } from '../../context/WatiContext.types';

const RightMenu: React.FC = () => {
    const {
        currentActiveChatMessages,
        currentActiveChatObjData,
        handleSendMessage,
        setMessage,
        message
    } = useWati();
    return (
        <Box sx={{
            borderRadius: 1,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            border: '1px solid #e0e0e0'
        }}>
            {/* Header */}
            <Box sx={{
                p: 1,
                borderBottom: '1px solid #e0e0e0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#f5f5f5',
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ width: 40, height: 40 }} />
                    <Box>
                        <Typography variant="subtitle1" fontWeight="bold">
                            {currentActiveChatObjData?.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            Last seen at {currentActiveChatObjData?.lastseen}
                        </Typography>
                    </Box>
                </Box>
                <IconButton>
                    <MoreVertIcon />
                </IconButton>
            </Box>
            {/* Chat Messages Area */}
            <Box sx={{
                flex: 1,
                overflowY: 'auto',
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                backgroundColor: '#f0f2f5',
            }}>
                {currentActiveChatMessages
                    ?.filter((message) => message.eventType === 'message')
                    .reverse()
                    .map((message, index) => (
                        <Box
                            key={index}
                            sx={{
                                alignSelf: message.owner ? 'flex-end' : 'flex-start',
                                maxWidth: '70%',
                                backgroundColor: message.owner ? '#0084ff' : '#fff',
                                color: message.owner ? '#fff' : '#000',
                                padding: 2,
                                borderRadius: 2,
                                boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
                            }}
                        >
                            <Typography variant="body1">
                                {message.text}
                            </Typography>
                            <Typography
                                variant="caption"
                                sx={{
                                    display: 'block',
                                    textAlign: 'right',
                                    opacity: 0.7,
                                    mt: 0.5
                                }}
                            >
                                {new Date(message.created).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </Typography>
                        </Box>
                    ))}
            </Box>
            {/* Footer */}
            <Box sx={{
                p: 1,
                borderTop: '1px solid #e0e0e0',
                backgroundColor: '#fff',
                display: 'flex',
                gap: 2,
                alignItems: 'center',
            }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Type a message"
                    size="small"
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '20px',
                            backgroundColor: '#f0f2f5'
                        }
                    }}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <IconButton
                    color="primary"
                    onClick={handleSendMessage}
                    sx={{
                        backgroundColor: '#0084ff',
                        '&:hover': {
                            backgroundColor: '#0073e6'
                        }
                    }}
                    disabled={!message}
                >
                    <SendIcon sx={{ color: 'white' }} />
                </IconButton>
            </Box>
        </Box>
    );
};

export default RightMenu; 