// import React, { useState } from 'react';
// import { Avatar, Box, IconButton, Typography, TextField } from '@mui/material';
// // import MoreVertIcon from '@mui/icons-material/MoreVert';
// import SendIcon from '@mui/icons-material/Send';
// import CloseIcon from '@mui/icons-material/Close';
// import { useWati } from '../../context/WatiContext.types';
// // import MinimizeIcon from '@mui/icons-material/Minimize';
// import UnfoldLessIcon from '@mui/icons-material/UnfoldLess'; // Minimize icon
// import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore'; // Restore icon


// interface ChatWindowProps {
//     index: number;
//     chatId: number;
//     onClose: () => void;
// }

// const ChatWindow: React.FC<ChatWindowProps> = ({ index, chatId, onClose }) => {
//     const {
//         currentActiveChatMessages,
//         currentActiveChatObjData,
//         handleSendMessage,
//         setMessage,
//         message,
//     } = useWati();

//     const [isMinimized, setIsMinimized] = useState(false);


//     return (

//         <>
//             {/* Minimized Tab */}
//             {isMinimized ? (

//                 <Box
//                     sx={{
//                         position: 'fixed',
//                         bottom: 16,
//                         right: 16 + 320 * index,
//                         width: 220,
//                         height: 50,
//                         background: 'linear-gradient(90deg, #4e54c8, #8f94fb)', // Vibrant gradient
//                         borderRadius: '25px',
//                         boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'space-between',
//                         padding: '0 12px',
//                         cursor: 'pointer',
//                         zIndex: 1000,
//                         color: '#fff',
//                     }}
//                     onClick={() => setIsMinimized(false)} // Restore the window when clicked
//                 >
//                     <Typography variant="subtitle2" noWrap sx={{ fontWeight: 'bold' }}>
//                         {currentActiveChatObjData?.name || 'Chat'}
//                     </Typography>
//                     <Box>
//                         <IconButton
//                             size="small"
//                             onClick={(e) => {
//                                 e.stopPropagation();
//                                 onClose();
//                             }}
//                             sx={{ color: '#fff' }}
//                         >
//                             <CloseIcon fontSize="small" />
//                         </IconButton>
//                     </Box>
//                 </Box>
//             ) : (
//                 // Expanded Chat Window
//                 <Box
//                     sx={{
//                         position: 'fixed',
//                         bottom: 16,
//                         right: 16 + 320 * index,
//                         width: 350, // Slightly larger width
//                         height: 500, // Slightly larger height
//                         background: '#fff',
//                         border: '1px solid #ddd',
//                         borderRadius: 1,
//                         boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
//                         display: 'flex',
//                         flexDirection: 'column',
//                         zIndex: 1000,
//                     }}
//                 >
//                     {/* Header */}
//                     {/* <Box
//                         sx={{
//                             p: 1,
//                             borderBottom: '1px solid #e0e0e0',
//                             display: 'flex',
//                             alignItems: 'center',
//                             justifyContent: 'space-between',
//                             backgroundColor: '#f5f5f5',
//                         }}
//                     >
//                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                             <Avatar sx={{ width: 40, height: 40 }} />
//                             <Box>
//                                 <Typography variant="subtitle1" fontWeight="bold">
//                                     {currentActiveChatObjData?.name}
//                                 </Typography>
//                                 <Typography variant="caption" color="text.secondary">
//                                     Last seen at {currentActiveChatObjData?.lastseen}
//                                 </Typography>
//                             </Box>
//                         </Box>
//                         <Box>
//                             <IconButton onClick={() => setIsMinimized(true)}>
//                                 <MinimizeIcon />
//                             </IconButton>
//                             <IconButton onClick={onClose}>
//                                 <CloseIcon />
//                             </IconButton>
//                         </Box>
//                     </Box> */}

//                     <Box
//                         sx={{
//                             p: 1,
//                             borderBottom: '1px solid #e0e0e0',
//                             display: 'flex',
//                             alignItems: 'center',
//                             justifyContent: 'space-between',
//                             backgroundColor: '#4e54c8', // Vibrant header background
//                             color: '#fff',
//                             borderTopLeftRadius: '15px',
//                             borderTopRightRadius: '15px',
//                         }}
//                     >
//                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                             <Avatar sx={{ width: 40, height: 40, backgroundColor: '#8f94fb' }} />
//                             <Box>
//                                 <Typography variant="subtitle1" fontWeight="bold">
//                                     {currentActiveChatObjData?.name}
//                                 </Typography>
//                                 <Typography variant="caption" color="rgba(255,255,255,0.8)">
//                                     Last seen at {currentActiveChatObjData?.lastseen}
//                                 </Typography>
//                             </Box>
//                         </Box>
//                         <Box>
//                             <IconButton onClick={() => setIsMinimized(true)} sx={{ color: '#fff' }}>
//                                 <UnfoldLessIcon />
//                             </IconButton>
//                             <IconButton onClick={onClose} sx={{ color: '#fff' }}>
//                                 <CloseIcon />
//                             </IconButton>
//                         </Box>
//                     </Box>

//                     {/* Chat Messages Area */}
//                     <Box
//                         sx={{
//                             flex: 1,
//                             overflowY: 'auto',
//                             p: 2,
//                             display: 'flex',
//                             flexDirection: 'column',
//                             gap: 2,
//                             backgroundColor: '#f0f2f5',
//                         }}
//                     >
//                         {currentActiveChatMessages
//                             ?.filter((message) => message.eventType === 'message')
//                             .reverse()
//                             .map((message, index) => (
//                                 <Box
//                                     key={index}
//                                     sx={{
//                                         alignSelf: message.owner ? 'flex-end' : 'flex-start',
//                                         maxWidth: '70%',
//                                         backgroundColor: message.owner ? '#0084ff' : '#fff',
//                                         color: message.owner ? '#fff' : '#000',
//                                         padding: 2,
//                                         borderRadius: 2,
//                                         boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
//                                     }}
//                                 >
//                                     <Typography variant="body1">{message.text}</Typography>
//                                     <Typography
//                                         variant="caption"
//                                         sx={{
//                                             display: 'block',
//                                             textAlign: 'right',
//                                             opacity: 0.7,
//                                             mt: 0.5,
//                                         }}
//                                     >
//                                         {new Date(message.created).toLocaleTimeString([], {
//                                             hour: '2-digit',
//                                             minute: '2-digit',
//                                         })}
//                                     </Typography>
//                                 </Box>
//                             ))}
//                     </Box>

//                     {/* Footer */}
//                     <Box
//                         sx={{
//                             p: 1,
//                             borderTop: '1px solid #e0e0e0',
//                             backgroundColor: '#fff',
//                             display: 'flex',
//                             gap: 2,
//                             alignItems: 'center',
//                         }}
//                     >
//                         <TextField
//                             fullWidth
//                             variant="outlined"
//                             placeholder="Type a message"
//                             size="small"
//                             sx={{
//                                 '& .MuiOutlinedInput-root': {
//                                     borderRadius: '20px',
//                                     backgroundColor: '#f0f2f5',
//                                 },
//                             }}
//                             value={message}
//                             onChange={(e) => setMessage(e.target.value)}
//                         />
//                         <IconButton
//                             color="primary"
//                             onClick={handleSendMessage}
//                             sx={{
//                                 backgroundColor: '#0084ff',
//                                 '&:hover': {
//                                     backgroundColor: '#0073e6',
//                                 },
//                             }}
//                             disabled={!message}
//                         >
//                             <SendIcon sx={{ color: 'white' }} />
//                         </IconButton>
//                     </Box>
//                 </Box>
//             )}
//         </>
//     );
// };

// export default ChatWindow;




import React, { useState } from 'react';
import { Avatar, Box, IconButton, Typography, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { useWati } from '../../context/WatiContext.types';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';

interface ChatWindowProps {
    index: number;
    chatId: number;
    onClose: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ index, chatId, onClose }) => {
    const [isMinimized, setIsMinimized] = useState(false); // State to track if the window is minimized
    const {
        currentActiveChatMessages,
        currentActiveChatObjData,
        handleSendMessage,
        setMessage,
        message,
    } = useWati();

    return (
        <>
            {/* Minimized Tab */}
            {isMinimized ? (
                <Box
                    sx={{
                        position: 'fixed',
                        bottom: 16,
                        right: 16 + 320 * index,
                        width: 220,
                        height: 50,
                        background: 'linear-gradient(90deg, #4e54c8, #8f94fb)', // Vibrant gradient
                        borderRadius: '25px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0 12px',
                        cursor: 'pointer',
                        zIndex: 1000,
                        color: '#fff',
                    }}
                    onClick={() => setIsMinimized(false)} // Restore the window when clicked
                >
                    <Typography variant="subtitle2" noWrap sx={{ fontWeight: 'bold' }}>
                        {currentActiveChatObjData?.name || 'Chat'}
                    </Typography>
                    <Box>
                        <IconButton
                            size="small"
                            onClick={(e) => {
                                // e.stopPropagation();
                                // onClose();
                            }}
                            sx={{ color: '#fff' }}
                        >
                            <OpenInFullIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                            size="small"
                            onClick={(e) => {
                                e.stopPropagation();
                                onClose();
                            }}
                            sx={{ color: '#fff' }}
                        >
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </Box>
                </Box>
            ) : (
                // Expanded Chat Window
                <Box
                    sx={{
                        position: 'fixed',
                        bottom: 16,
                        right: 16 + 380 * index,
                        width: 360, // Slightly larger width
                        height: 520, // Slightly larger height
                        background: '#fff',
                        borderRadius: '15px',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                        display: 'flex',
                        flexDirection: 'column',
                        zIndex: 1000,
                    }}
                >
                    {/* Header */}
                    <Box
                        sx={{
                            p: 1,
                            borderBottom: '1px solid #e0e0e0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            backgroundColor: '#4e54c8', // Vibrant header background
                            color: '#fff',
                            borderTopLeftRadius: '15px',
                            borderTopRightRadius: '15px',
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar sx={{ width: 40, height: 40, backgroundColor: '#8f94fb' }} />
                            <Box>
                                <Typography variant="subtitle1" fontWeight="bold">
                                    {currentActiveChatObjData?.name}
                                </Typography>
                                <Typography variant="caption" color="rgba(255,255,255,0.8)">
                                    Last seen at {currentActiveChatObjData?.lastseen}
                                </Typography>
                            </Box>
                        </Box>
                        <Box>
                            <IconButton onClick={() => setIsMinimized(true)} sx={{ color: '#fff' }}>
                                <CloseFullscreenIcon />
                            </IconButton>
                            <IconButton onClick={onClose} sx={{ color: '#fff' }}>
                                <CloseIcon />
                            </IconButton>
                        </Box>
                    </Box>

                    {/* Chat Messages Area */}
                    <Box
                        sx={{
                            flex: 1,
                            overflowY: 'auto',
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            backgroundColor: '#f0f2f5',
                        }}
                    >
                        {currentActiveChatMessages
                            ?.filter((message) => message.eventType === 'message')
                            .reverse()
                            .map((message, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        alignSelf: message.owner ? 'flex-end' : 'flex-start',
                                        maxWidth: '70%',
                                        backgroundColor: message.owner ? '#4e54c8' : '#fff',
                                        color: message.owner ? '#fff' : '#000',
                                        padding: 2,
                                        borderRadius: 2,
                                        boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                                    }}
                                >
                                    <Typography variant="body1">{message.text}</Typography>
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            display: 'block',
                                            textAlign: 'right',
                                            opacity: 0.7,
                                            mt: 0.5,
                                        }}
                                    >
                                        {new Date(message.created).toLocaleTimeString([], {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </Typography>
                                </Box>
                            ))}
                    </Box>

                    {/* Footer */}
                    <Box
                        sx={{
                            p: 1,
                            borderTop: '1px solid #e0e0e0',
                            backgroundColor: '#fff',
                            display: 'flex',
                            gap: 2,
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Type a message"
                            size="small"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '20px',
                                    backgroundColor: '#f0f2f5',
                                },
                            }}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <IconButton
                            color="primary"
                            onClick={handleSendMessage}
                            sx={{
                                backgroundColor: '#4e54c8',
                                '&:hover': {
                                    backgroundColor: '#8f94fb',
                                },
                            }}
                            disabled={!message}
                        >
                            <SendIcon sx={{ color: 'white' }} />
                        </IconButton>
                    </Box>
                </Box>
            )}
        </>
    );
};

export default ChatWindow;