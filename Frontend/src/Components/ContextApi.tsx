import React, { createContext, useContext } from 'react';
import type { ReactNode } from 'react';

interface ApiContextType {
  baseURL: string;
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);

interface ApiProviderProps {
  children: ReactNode;
}

export const ApiProvider: React.FC<ApiProviderProps> = ({ children }) => {
  const baseURL = 'https://highway-delite-assignment-backend-5w1o.onrender.com';

  return (
    <ApiContext.Provider value={{ baseURL }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = (): ApiContextType => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  return context;
};
