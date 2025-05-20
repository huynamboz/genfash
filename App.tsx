// @@iconify-code-gen
import { supabase } from '@/libs/supabase';
import AppNavigation from '@/navigation/AppNavigation';
import { useAuthStore } from '@/stores/auth';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import './global.css';

const App = () => {
  const { setSession, setUser } = useAuthStore();
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        setUser(session.user);
      }
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        setUser(session.user);
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <GestureHandlerRootView>
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
