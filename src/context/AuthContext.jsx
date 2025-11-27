import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../jsx/supabase/client';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState('viewer');
  const [loading, setLoading] = useState(true);

  // Para evitar pedir el rol muchas veces para el mismo user
  const [lastRoleUserId, setLastRoleUserId] = useState(null);

  const fetchUserRole = async (userId) => {
    // Evitar refetch innecesario
    if (!userId) return;
    if (lastRoleUserId === userId && role !== 'viewer') {
      return;
    }

    try {
      const { data, error } = await supabase
        .from('users')
        .select('role')
        .eq('auth_user_id', userId)
        .single();

      if (error) {
        console.error('Error fetching user role:', error);
        setRole('viewer');
      } else {
        setRole(data?.role || 'viewer');
        setLastRoleUserId(userId);
      }
    } catch (error) {
      console.error('Unexpected error fetching role (catch):', error);
      setRole('viewer');
    }
  };

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange(
      async (event, session) => {

        if (session?.user) {
          setUser(session.user);
          fetchUserRole(session.user.id);
        } else {
          setUser(null);
          setRole('viewer');
          setLastRoleUserId(null);
        }

        setLoading(false);
      }
    );

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setRole('viewer');
    setLastRoleUserId(null);
  };

  const value = { user, role, loading, signOut };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth debe usarse dentro de un <AuthProvider>');
  }
  return ctx;
};
