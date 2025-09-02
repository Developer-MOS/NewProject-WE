import { createContext, useContext } from 'react';

export interface Contact {
    phone: string;
    fullName: string;
    lastUpdated: string;
    [key: string]: unknown;
}

export interface Message {
    eventType: string;
    owner: boolean;
    text: string;
    created: string;
    [key: string]: unknown;
}

export interface ApiContactsResponse {
    contact_list: Contact[];
}

export interface ApiMessagesResponse {
    messages: { items: Message[] };
}

export interface WatiContextType {
    chatLists: Contact[];
    selectedChatMobileNumber: string | null;
    setSelectedChatMobileNumber: (phone: string) => void;
    currentActiveChatMessages: Message[];
    currentActiveChatObjData: { name: string; lastseen: string };
    message: string;
    setMessage: (msg: string) => void;
    loading: boolean;
    handleSendMessage: (msg: unknown) => Promise<void>;
    // reFetchMessages : boolean;
    // setReFetchMessages : (value : boolean) => void;
}

export const WatiContext = createContext<WatiContextType | undefined>(undefined);

export const useWati = () => {
    const context = useContext(WatiContext);
    if (context === undefined) {
        throw new Error('useWati must be used within a WatiProvider');
    }
    return context;
}; 