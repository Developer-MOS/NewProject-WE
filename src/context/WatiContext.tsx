import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { apiCall } from '../utils/apiFunctionCall';
import { getEnv } from '../config/env';
import type { Contact, Message, ApiContactsResponse, ApiMessagesResponse } from './WatiContext.types';
import { WatiContext } from './WatiContext.types';
import { useAppContext } from './AppContext';
// import { useWati, WatiContext } from './WatiContext.types';

export const WatiProvider = ({ children }: { children: ReactNode }) => {
    const [chatLists, setChatLists] = useState<Contact[]>([]);
    const [selectedChatMobileNumber, setSelectedChatMobileNumber] = useState<string | null>(null);
    const [currentActiveChatMessages, setCurrentActiveChatMessages] = useState<Message[]>([]);
    const [currentActiveChatObjData, setCurrentActiveChatObjData] = useState<{ name: string; lastseen: string }>({ name: '', lastseen: '' });
    const [message, setMessage] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const { reFetchMessages } = useAppContext();
    // const [reFetchMessages, setReFetchMessages] = useState(false);

    const [openChats, setOpenChats] = useState<{ id: number }[]>([]);

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


    console.log(chatLists, 'This is the CHAT LISTS OPTION');
    console.log(currentActiveChatMessages, 'This is the CURRENT ACTIVE CHAT MESSAGES OPTION');
    console.log(currentActiveChatObjData, 'This is the CURRENT ACTIVE CHAT OBJ DATA OPTION');


    return (
        <WatiContext.Provider value={{
            chatLists,
            selectedChatMobileNumber,
            setSelectedChatMobileNumber,
            currentActiveChatMessages,
            currentActiveChatObjData,
            message,
            setMessage,
            loading,
            handleSendMessage,
            openChats,
            setOpenChats,
        }}>
            {children}
        </WatiContext.Provider>
    );
};

export default WatiProvider; 