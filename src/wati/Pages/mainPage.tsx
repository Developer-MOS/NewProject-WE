import { Avatar, Box, IconButton, Typography, TextField, CircularProgress } from '@mui/material'
import { Grid } from '@mui/material'
import { useEffect, useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SendIcon from '@mui/icons-material/Send';
import { apiCall } from '../../utils/apiFunctionCall';
import { getEnv } from '../../config/env';

interface Contact {
    phone: string;
    fullName: string;
    lastUpdated: string;
    [key: string]: unknown;
}

interface Message {
    eventType: string;
    owner: boolean;
    text: string;
    created: string;
    [key: string]: unknown;
}

interface ApiContactsResponse {
    contact_list: Contact[];
}

interface ApiMessagesResponse {
    messages: { items: Message[] };
}


const HomePage: React.FC = () => {
    const [chatLists, setChatLists] = useState<Contact[]>([]);
    const [selectedChatMobileNumber, setSelectedChatMobileNumber] = useState<string | null>(null);
    const [currentActiveChatMessages, setCurrentActiveChatMessages] = useState<Message[]>([]);
    const [currentActiveChatObjData, setCurrentActiveChatObjData] = useState<{ name: string; lastseen: string }>({ name: '', lastseen: '' });
    const [message, setMessage] = useState<string>('');
    const [loading, setLoading] = useState(true);

    // Fetch contacts and templates on mount
    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            const messagesData = await apiCall<ApiContactsResponse>(`${getEnv().apiUrl}/api/v1/getContacts`);
            if (messagesData?.status === 200 && messagesData.data && messagesData.data.contact_list?.length) {
                setSelectedChatMobileNumber(messagesData.data.contact_list[0].phone);
                setChatLists(messagesData.data.contact_list);
                setCurrentActiveChatObjData((prev) => ({
                    ...prev,
                    name: messagesData.data!.contact_list[0].fullName,
                    lastseen: new Date(messagesData.data!.contact_list[0].lastUpdated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                }));
            }
            setLoading(false);
        };
        getData();
    }, []);

    // Fetch messages when a contact is selected
    useEffect(() => {
        const getMessagesDataBasedOnNumber = async () => {
            if (selectedChatMobileNumber) {
                const messagesList = await apiCall<ApiMessagesResponse>(`${getEnv().apiUrl}/api/v1/getMessages/${selectedChatMobileNumber}`);
                const items = messagesList?.data?.messages?.items;
                const filteredValue = chatLists.filter((item) => item.phone === selectedChatMobileNumber);
                if (items && items.length > 0 && filteredValue.length > 0) {
                    setCurrentActiveChatMessages(items);
                    setCurrentActiveChatObjData((prev) => ({
                        ...prev,
                        name: filteredValue[0].fullName,
                        lastseen: new Date(filteredValue[0].lastUpdated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    }));
                }
            }
        };
        getMessagesDataBasedOnNumber();
    }, [selectedChatMobileNumber, chatLists]);

    const handleSendMessage = async (msg: unknown) => {
        const formData = new FormData();
        if (message) {
            formData.append('messageText', message);
        }
        if (msg) {
            const sendMsgApiCall = await apiCall(`${getEnv().apiUrl}/api/v1/sendSessionMessage/${916366510578}`, { method: 'POST', body: formData });
            if (sendMsgApiCall?.status === 200) {
                setMessage('');
            }
        }
    };

    return (
        loading ? (
            <Box display="flex" alignItems="center" justifyContent="center" height="100vh" width="100vw">
                <CircularProgress size={64} thickness={5} />
            </Box>
        ) : (
            <Box sx={{ width: '100vw', background: '#f5f7fa' , marginBottom:200 }}>
                <Grid container spacing={0} sx={{ height: '90vh', width: '100%' }}>
                    {/* Left side menu */}
                    <Grid sx={{ height: '100%' , width : '20%' , background :'' }}>
                        <LeftMenu
                            chatLists={chatLists}
                            setSelectedChatMobileNumber={setSelectedChatMobileNumber}
                        />
                    </Grid>
                    {/* Right side content */}
                    <Grid sx={{ height: '100%' ,width : '80%', background:'yellow' }}>
                        <RightMenu
                            currentActiveChatMessages={currentActiveChatMessages}
                            currentActiveChatObjData={currentActiveChatObjData}
                            handleSendMessage={handleSendMessage}
                            message={message}
                            setMessage={setMessage}
                        />
                    </Grid>
                </Grid>
            </Box>
        )
    );
};

interface LeftMenuProps {
    chatLists: Contact[];
    setSelectedChatMobileNumber: (phone: string) => void;
}

const LeftMenu: React.FC<LeftMenuProps> = ({ chatLists, setSelectedChatMobileNumber }) => {
    return (
        <Box sx={{
            borderRadius: 1,
            overflowY: 'auto',
            width: '100%',
            height: '100%',
            // background: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)',
            boxShadow: 2
        }}>
            {chatLists.map((item) => (
                <Box
                    key={item.phone}
                    sx={{
                        // paddingX: 2,
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
                            // paddingLeft:1,
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

interface RightMenuProps {
    currentActiveChatMessages: Message[];
    currentActiveChatObjData: { name: string; lastseen: string };
    handleSendMessage: (msg: unknown) => void;
    setMessage: (msg: string) => void;
    message: string;
}

const RightMenu: React.FC<RightMenuProps> = ({
    currentActiveChatMessages,
    currentActiveChatObjData,
    handleSendMessage,
    setMessage,
    message
}) => {
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
                // background:'red',
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

export default HomePage;

