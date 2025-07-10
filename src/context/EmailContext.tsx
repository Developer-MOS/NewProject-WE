import axios from 'axios';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

// Add type declarations for Google API
declare global {
  interface Window {
    google: {
      accounts: {
        oauth2: {
          initTokenClient: (config: {
            client_id: string;
            scope: string;
            callback: (response: { access_token: string }) => void;
            error_callback?: (error: { type: string; message: string }) => void;
          }) => {
            requestAccessToken: () => void;
          };
        };
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: { credential: string }) => void;
          }) => void;
          renderButton: (
            element: HTMLElement,
            config: {
              type: string;
              theme: string;
              size: string;
              text: string;
              shape: string;
              logo_alignment: string;
              width: number;
            }
          ) => void;
        };
      };
    };
  }
}

interface Email {
  id: string;
  sender: string;
  senderEmail: string;
  subject: string;
  preview: string;
  time: string;
  starred: boolean;
  read: boolean;
  body: string;
  threadId: string;
  labels: string[];
}

interface GmailMessage {
  id: string;
  threadId: string;
  labelIds: string[];
  snippet: string;
  payload: {
    headers: Array<{
      name: string;
      value: string;
    }>;
    body?: {
      data?: string;
    };
    parts?: Array<{
      mimeType: string;
      body: {
        data: string;
      };
    }>;
  };
}

interface EmailContextType {
  emails: Email[];
  selectedEmail: Email | null;
  setSelectedEmail: (email: Email | null) => void;
  toggleStar: (emailId: string) => void;
  markAsRead: (emailId: string) => void;
  isAuthenticated: boolean;
  authError: string | null;
  isLoading: boolean;
  signInButtonRef: React.RefObject<HTMLDivElement | null>;
  handleLogin: () => void;
  showCompose: boolean;
  setShowCompose: (show: boolean) => void;
  bearerToken: string;
}

const EmailContext = createContext<EmailContextType | undefined>(undefined);

const CLIENT_ID = "872542913402-nrvfn445k1p3kpbrbfdct1ar1el7hiqu.apps.googleusercontent.com";

export function EmailProvider({ children }: { children: ReactNode }) {
  // const getBearerTokenFromSessionStorage = sessionStorage.getItem
  const [emails, setEmails] = useState<Email[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const tokenClientRef = useRef<any>(null);
  const [sdkReady, setSdkReady] = useState(false);
  const [bearerToken, setBearerToken] = useState<string>(sessionStorage.getItem("accessToken") || '');
  const [isAuthenticated, setIsAuthenticated] = useState(bearerToken ? true : false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const signInButtonRef = useRef<HTMLDivElement>(null);
  const [showCompose, setShowCompose] = useState(false);

  console.log(sdkReady)

  useEffect(() => {

    if (bearerToken) {
      return;
    }

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;


    script.onload = () => {

      tokenClientRef.current = window.google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: "https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.send https://www.googleapis.com/auth/gmail.compose",
        callback: async (tokenResponse: any) => {
          sessionStorage.setItem("accessToken", tokenResponse.access_token)
          setBearerToken(tokenResponse.access_token);
          setIsAuthenticated(true);
          setAuthError(null);

          try {
            const res = await fetch(
              "https://gmail.googleapis.com/gmail/v1/users/me/profile",
              {
                headers: {
                  Authorization: `Bearer ${tokenResponse.access_token}`,
                },
              }
            );
            const data = await res.json();
          } catch (err) {
            console.error("❌ Failed to fetch Gmail data", err);
            setAuthError("Failed to verify Gmail access. Please try again.");
          }
        },
      });

      setSdkReady(true);
    };

    script.onerror = () => {
      console.error("Failed to load Google Sign-In script");
      setAuthError("Failed to load Google Sign-In script. Please check your internet connection and try again.");
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleLogin = () => {
    if (tokenClientRef.current) {
      tokenClientRef.current.requestAccessToken();
    } else {
      setAuthError("Google SDK not ready yet, please wait...");
    }
  };

  const decodeBase64 = (data: string) => {
    return atob(data.replace(/-/g, "+").replace(/_/g, "/"));
  };

  const getHeaderValue = (headers: GmailMessage['payload']['headers'], name: string): string => {
    const header = headers.find(h => h.name.toLowerCase() === name.toLowerCase());
    return header?.value || '';
  };

  const fetchEmailDetails = async (messageId: string) => {
    try {
      const response = await axios.get<GmailMessage>(
        `https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageId}?format=full`,
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching email details:', error);
      throw error;
    }
  };

  const fetchEmails = async () => {
    if (!bearerToken) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.get<{ messages: Array<{ id: string }> }>(
        'https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=10',
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          }
        }
      );


      const emailPromises = response.data.messages.map(async (message) => {
        const details = await fetchEmailDetails(message.id);
        const headers = details.payload.headers;

        let body = '';
        if (details.payload.body?.data) {
          body = decodeBase64(details.payload.body.data);
        } else if (details.payload.parts) {
          for (const part of details.payload.parts) {
            if (part.mimeType === "text/html" || part.mimeType === "text/plain") {
              body = decodeBase64(part.body.data);
              break;
            }
          }
        }

        const fromHeader = getHeaderValue(headers, 'From');
        const senderMatch = fromHeader.match(/(.*?)\s*<([^>]+)>/) || [null, fromHeader, fromHeader];
        const senderName = senderMatch[1]?.trim() || fromHeader;
        const senderEmail = senderMatch[2] || fromHeader;

        const date = new Date(getHeaderValue(headers, 'Date'));
        const formattedDate = date.toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          hour12: true
        });

        const email = {
          id: message.id,
          sender: senderName,
          senderEmail: senderEmail,
          subject: getHeaderValue(headers, 'Subject') || '(No Subject)',
          preview: details.snippet,
          time: formattedDate,
          starred: details.labelIds.includes('STARRED'),
          read: !details.labelIds.includes('UNREAD'),
          body: body,
          threadId: details.threadId,
          labels: details.labelIds
        };

        return email;
      });

      const fetchedEmails = await Promise.all(emailPromises);
      setEmails(fetchedEmails);
    } catch (error) {
      console.error('Error fetching emails:', error);
      setAuthError('Failed to fetch emails. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch emails when we get a new token
  useEffect(() => {
    if (bearerToken) {
      fetchEmails();
    }
  }, [bearerToken]);

  const toggleStar = async (emailId: string) => {
    try {
      const email = emails.find(e => e.id === emailId);
      if (!email) return;

      const newStarredState = !email.starred;

      await axios.post(
        `https://gmail.googleapis.com/gmail/v1/users/me/messages/${emailId}/modify`,
        {
          addLabelIds: newStarredState ? ['STARRED'] : [],
          removeLabelIds: !newStarredState ? ['STARRED'] : [],
        },
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          }
        }
      );

      setEmails(emails.map(email =>
        email.id === emailId
          ? { ...email, starred: newStarredState }
          : email
      ));
    } catch (error) {
      console.error('Error toggling star:', error);
    }
  };

  const markAsRead = async (emailId: string) => {
    try {
      await axios.post(
        `https://gmail.googleapis.com/gmail/v1/users/me/messages/${emailId}/modify`,
        {
          removeLabelIds: ['UNREAD'],
        },
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          }
        }
      );

      setEmails(emails.map(email =>
        email.id === emailId
          ? { ...email, read: true }
          : email
      ));
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  const value = {
    emails,
    selectedEmail,
    setSelectedEmail,
    toggleStar,
    markAsRead,
    isAuthenticated,
    authError,
    isLoading,
    signInButtonRef,
    handleLogin,
    showCompose,
    setShowCompose,
    bearerToken
  };

  return (
    <EmailContext.Provider value={value}>
      {children}
    </EmailContext.Provider>
  );
}

export function useEmail() {
  const context = useContext(EmailContext);
  if (context === undefined) {
    throw new Error('useEmail must be used within an EmailProvider');
  }
  return context;
} 