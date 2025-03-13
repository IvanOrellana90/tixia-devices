import { useEffect, useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { supabase } from '../supabase/client';

const PrivateRoute = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        sessionStorage.setItem('user', JSON.stringify(data.user));
        setIsAuthenticated(true);
      } else {
        sessionStorage.removeItem('user');
        navigate('/page-login');
      }
    };
    checkUser();
  }, [navigate]);

  return isAuthenticated ? <Outlet /> : null;
};

export default PrivateRoute;
