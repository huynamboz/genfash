// @@iconify-code-gen
import { supabase } from '@/libs/supabase';
import AppNavigation from '@/navigation/AppNavigation';
import { GetUser } from '@/services/user';
import { useAuthStore } from '@/stores/auth';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import './global.css';

const App = () => {
  const { setSession, setUser } = useAuthStore();
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      console.log('Session:', session);
      if (session) {
        GetUser(session.user.id)
          .then((data) => setUser(data))
          .catch((error) => {
            console.error('Error fetching user data:', error);
            setUser(null);
          });
      }
    });
    supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      if (session) {
        const data = await GetUser(session.user.id);
        setUser(data);
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
      <Toast />
    </GestureHandlerRootView>
  );
};

export default App;
