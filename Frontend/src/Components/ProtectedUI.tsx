import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useApi } from './ContextApi';
import axios from 'axios';

interface ProtectedUIProps {
  children: ReactNode;
}

const ProtectedUI: React.FC<ProtectedUIProps> = ({ children }) => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  const { baseURL } = useApi();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(`${baseURL}/uiValidation`, {
          withCredentials: true,
        });
        setIsAuth(res.data.authenticated);
      } catch (error) {
        setIsAuth(false);
      }
    };

    checkAuth();
  }, [baseURL]);

  if (isAuth === null) return <div>Loading...</div>;
  if (!isAuth) return <Navigate to="/" />;

  return <>{children}</>;
};

export default ProtectedUI;
