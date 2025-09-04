import { Avatar, Box, Typography } from '@mui/material';
import { useWati } from '../../context/WatiContext.types';
import ChatWindow from '../Components/ChatWindow';

const LeftMenu: React.FC = () => {
    const { chatLists, setSelectedChatMobileNumber, setOpenChats, openChats } = useWati();


    // const handleOpenChat = (chat: { id: number }) => {
    //     setOpenChats((prevChats) : chat: { id: number } => {
    //         if (prevChats.find((c) => c.id === chat.id)) {
    //             return prevChats; // Chat is already open
    //         }
    //         if (prevChats.length >= 2) {
    //             return prevChats; // Maximum of 2 windows allowed
    //         }
    //         return [...prevChats, chat];
    //     });
    // };



    const handleOpenChat = (chat: { id: number }) => {
        setOpenChats((prevChats) => {
            if (prevChats.find((c) => c.id === chat.id)) {
                return prevChats;
            }
            if (prevChats.length >= 2) {
                return prevChats;
            }
            return [...prevChats, chat];
        });
    };


    const handleCloseChat = (chatId: number) => {
        setOpenChats((prevChats) => prevChats.filter((chat) => chat.id !== chatId));
    };

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
                    onClick={() => {
                        setSelectedChatMobileNumber(item.phone)
                        handleOpenChat({ id: Number(item?.phone) });
                    }}
                >
                    <Avatar
                        sx={{
                            ml: 2,
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
            {openChats.map((chat,index) => (
                <ChatWindow
                    key={chat.id}
                    index={index}
                    chatId={Number(chat.id)}
                    onClose={() => handleCloseChat(chat.id)}
                />
            ))}

            {/* <ChatWindow
                // key={chat.id}
                chatId={Number(20)}
                onClose={() => {}}
            /> */}

        </Box>
    );
};

export default LeftMenu; 