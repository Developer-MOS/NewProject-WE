import React, { createContext, useContext } from 'react';

export interface LoginData {
  logo: File | null;
  companyName: string;
  apiKey: string;
  apiUrl: string;
  clientId: string;
}

export interface AppContextType {
  loginData: LoginData | null;
  setLoginData: React.Dispatch<React.SetStateAction<LoginData | null>>;
  logoUrl: string | undefined;
  setLogoUrl: React.Dispatch<React.SetStateAction<string | undefined>>;
  selected: null | 'email' | 'wati';
  setSelected: React.Dispatch<React.SetStateAction<null | 'email' | 'wati'>>;
  openEmailNotification: boolean;
  setOpenEmailNotification: React.Dispatch<React.SetStateAction<boolean>>;
  openWatiNotification: boolean;
  setOpenWatiNotification: React.Dispatch<React.SetStateAction<boolean>>;
  reFetchMessages: boolean;
  setReFetchMessages: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);
export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within AppContextProvider');
  return ctx;
}; 