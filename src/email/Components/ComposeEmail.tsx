import { useState, useRef, useEffect } from 'react';
import {
    Box,
    Paper,
    IconButton,
    TextField,
    Button,
    Typography,
    Collapse,
    Tooltip,
    Fade,
    Snackbar,
    Alert,
} from '@mui/material';
import {
    Close as CloseIcon,
    Send as SendIcon,
    Delete as DeleteIcon,
    Drafts as DraftsIcon,
    ExpandMore as ExpandMoreIcon,
    ExpandLess as ExpandLessIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { useEmail } from '../../context/EmailContext';
import { Buffer } from 'buffer';

interface ComposeEmailProps {
    onClose: () => void;
}

interface EmailData {
    to: string;
    cc: string;
    bcc: string;
    subject: string;
    body: string;
}

const DraggablePaper = styled(Paper)({
    position: 'fixed',
    bottom: 0,
    right: '2rem',
    width: '500px',
    height: '500px',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    borderRadius: '16px 16px 0 0',
    overflow: 'hidden',
    zIndex: 1000,
    background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.18)',
});

const StyledTextField = styled(TextField)({
    '& .MuiInputBase-root': {
        fontSize: '0.875rem',
        transition: 'all 0.3s ease',
        borderRadius: '8px',
        '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.02)',
        },
        '&.Mui-focused': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
            boxShadow: '0 0 0 2px rgba(66, 153, 225, 0.2)',
        },
    },
    '& .MuiInputBase-input': {
        padding: '12px 16px',
    },
});

const ActionButton = styled(IconButton)({
    color: '#4a5568',
    padding: '8px',
    transition: 'all 0.2s ease',
    '&:hover': {
        backgroundColor: 'rgba(66, 153, 225, 0.1)',
        transform: 'translateY(-1px)',
    },
});

const SendButton = styled(Button)({
    background: 'linear-gradient(135deg, #4299e1 0%, #3182ce 100%)',
    color: 'white',
    textTransform: 'none',
    borderRadius: '8px',
    padding: '8px 24px',
    fontSize: '0.875rem',
    fontWeight: 600,
    boxShadow: '0 4px 6px rgba(66, 153, 225, 0.2)',
    transition: 'all 0.3s ease',
    minWidth: '100px',
    '&:hover': {
        background: 'linear-gradient(135deg, #3182ce 0%, #2c5282 100%)',
        boxShadow: '0 6px 8px rgba(66, 153, 225, 0.3)',
        transform: 'translateY(-1px)',
    },
    '&:active': {
        transform: 'translateY(1px)',
        boxShadow: '0 2px 4px rgba(66, 153, 225, 0.2)',
    },
});

const RecipientField = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '4px 0',
    transition: 'all 0.2s ease',
});

const RecipientButton = styled(Button)({
    color: '#4299e1',
    textTransform: 'none',
    fontSize: '0.875rem',
    fontWeight: 500,
    padding: '4px 12px',
    borderRadius: '16px',
    transition: 'all 0.2s ease',
    '&:hover': {
        backgroundColor: 'rgba(66, 153, 225, 0.08)',
        transform: 'translateY(-1px)',
    },
    '&.active': {
        backgroundColor: 'rgba(66, 153, 225, 0.12)',
        color: '#2b6cb0',
    },
});

const ComposeEmail = ({ onClose }: ComposeEmailProps) => {

    const { bearerToken } = useEmail();
    const [showCc, setShowCc] = useState(false);
    const [showBcc, setShowBcc] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [emailData, setEmailData] = useState<EmailData>({
        to: '',
        cc: '',
        bcc: '',
        subject: '',
        body: '',
    });

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success' as 'success' | 'error',
    });

    const dragStartPos = useRef({ x: 0, y: 0 });

    const handleMouseDown = (e: React.MouseEvent) => {
        if (e.target instanceof HTMLElement && e.target.closest('.drag-handle')) {
            setIsDragging(true);
            dragStartPos.current = {
                x: e.clientX - position.x,
                y: e.clientY - position.y,
            };
        }
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (isDragging) {
            setPosition({
                x: e.clientX - dragStartPos.current.x,
                y: e.clientY - dragStartPos.current.y,
            });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);

    const handleInputChange = (field: keyof EmailData) => (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setEmailData(prev => ({
            ...prev,
            [field]: event.target.value,
        }));
    };

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateEmailList = (emails: string) => {
        if (!emails.trim()) return true;
        return emails.split(',').every(email => validateEmail(email.trim()));
    };

    const handleSend = async () => {
        // Validate required fields
        if (!emailData.to.trim()) {
            setSnackbar({
                open: true,
                message: 'Please enter recipient email address',
                severity: 'error',
            });
            return;
        }

        // Validate email formats
        if (!validateEmailList(emailData.to)) {
            setSnackbar({
                open: true,
                message: 'Invalid recipient email address',
                severity: 'error',
            });
            return;
        }

        if (emailData.cc && !validateEmailList(emailData.cc)) {
            setSnackbar({
                open: true,
                message: 'Invalid CC email address',
                severity: 'error',
            });
            return;
        }

        if (emailData.bcc && !validateEmailList(emailData.bcc)) {
            setSnackbar({
                open: true,
                message: 'Invalid BCC email address',
                severity: 'error',
            });
            return;
        }

        try {
            // Create email content
            const emailLines = [
                'Content-Type: text/plain; charset="UTF-8"\n',
                'MIME-Version: 1.0\n',
                'From: sathiskumar.r@megaaopes.com\n',
                `To: ${emailData.to}\n`,
                emailData.cc ? `Cc: ${emailData.cc}\n` : '',
                emailData.bcc ? `Bcc: ${emailData.bcc}\n` : '',
                `Subject: ${emailData.subject}\n\n`,
                emailData.body
            ].join('');

            // Encode the email content
            const base64EncodedEmail = Buffer.from(emailLines)
                .toString('base64')
                .replace(/\+/g, '-')
                .replace(/\//g, '_')
                .replace(/=+$/, '');

            // Send the email using Gmail API
            const response = await axios.post(
                'https://gmail.googleapis.com/gmail/v1/users/me/messages/send',
                { raw: base64EncodedEmail },
                {
                    headers: {
                        Authorization: `Bearer ${bearerToken}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.status === 200) {
                setSnackbar({
                    open: true,
                    message: 'Email sent successfully!',
                    severity: 'success',
                });
                
                // Close the compose window after successful send
                setTimeout(() => {
                    onClose();
                }, 1500);
            }
        } catch (error) {
            console.error('Error sending email:', error);
            setSnackbar({
                open: true,
                message: 'Failed to send email. Please try again.',
                severity: 'error',
            });
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar(prev => ({ ...prev, open: false }));
    };

    return (
        <DraggablePaper
            sx={{
                transform: `translate(${position.x}px, ${position.y}px)`,
            }}
            onMouseDown={handleMouseDown}
        >
            {/* Header */}
            <Box
                className="drag-handle"
                sx={{
                    p: 1.5,
                    background: 'linear-gradient(145deg, #f8f9fa 0%, #ffffff 100%)',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
                    cursor: 'move',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <Typography variant="subtitle1" sx={{ color: '#2d3748', fontWeight: 600 }}>
                    New Message
                </Typography>
                <Box sx={{ display: 'flex', gap: 0.5 }}>
                    <Tooltip title="Close">
                        <ActionButton size="small" onClick={onClose}>
                            <CloseIcon />
                        </ActionButton>
                    </Tooltip>
                </Box>
            </Box>

            <Collapse in={true}>
                <Box sx={{ p: 2, flex: 1, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                    {/* To field */}
                    <StyledTextField
                        fullWidth
                        variant="standard"
                        placeholder="To"
                        value={emailData.to}
                        onChange={handleInputChange('to')}
                        InputProps={{
                            disableUnderline: true,
                        }}
                    />

                    {/* Cc/Bcc fields */}
                    <RecipientField>
                        <RecipientButton
                            size="small"
                            onClick={() => setShowCc(!showCc)}
                            className={showCc ? 'active' : ''}
                            startIcon={showCc ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
                        >
                            Cc
                        </RecipientButton>
                        <RecipientButton
                            size="small"
                            onClick={() => setShowBcc(!showBcc)}
                            className={showBcc ? 'active' : ''}
                            startIcon={showBcc ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
                        >
                            Bcc
                        </RecipientButton>
                    </RecipientField>

                    <Collapse in={showCc}>
                        <StyledTextField
                            fullWidth
                            variant="standard"
                            placeholder="Cc"
                            value={emailData.cc}
                            onChange={handleInputChange('cc')}
                            InputProps={{
                                disableUnderline: true,
                            }}
                            sx={{ pl: 2 }}
                        />
                    </Collapse>

                    <Collapse in={showBcc}>
                        <StyledTextField
                            fullWidth
                            variant="standard"
                            placeholder="Bcc"
                            value={emailData.bcc}
                            onChange={handleInputChange('bcc')}
                            InputProps={{
                                disableUnderline: true,
                            }}
                            sx={{ pl: 2 }}
                        />
                    </Collapse>

                    {/* Subject field */}
                    <StyledTextField
                        fullWidth
                        variant="standard"
                        placeholder="Subject"
                        value={emailData.subject}
                        onChange={handleInputChange('subject')}
                        InputProps={{
                            disableUnderline: true,
                        }}
                    />

                    {/* Message body */}
                    <StyledTextField
                        fullWidth
                        multiline
                        rows={5}
                        variant="standard"
                        placeholder="Compose email"
                        value={emailData.body}
                        onChange={handleInputChange('body')}
                        InputProps={{
                            disableUnderline: true,
                        }}
                        sx={{
                            flex: 1,
                            '& .MuiInputBase-root': {
                                height: '100%',
                                alignItems: 'flex-start',
                            },
                        }}
                    />

                    {/* Footer with modern toolbar */}
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mt: 2,
                        px: 1,
                        borderTop: '1px solid rgba(0, 0, 0, 0.08)',
                        pt: 2,
                    }}>
                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                            <Tooltip
                                title="Send (Ctrl + Enter)"
                                TransitionComponent={Fade}
                                placement="top"
                            >
                                <SendButton
                                    variant="contained"
                                    startIcon={<SendIcon />}
                                    onClick={handleSend}
                                >
                                    Send
                                </SendButton>
                            </Tooltip>
                            <Tooltip title="Delete" TransitionComponent={Fade}>
                                <ActionButton size="small">
                                    <DeleteIcon />
                                </ActionButton>
                            </Tooltip>
                            <Tooltip title="Save as Draft" TransitionComponent={Fade}>
                                <ActionButton size="small">
                                    <DraftsIcon />
                                </ActionButton>
                            </Tooltip>
                        </Box>
                    </Box>
                </Box>
            </Collapse>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </DraggablePaper>
    );
};

export default ComposeEmail; 