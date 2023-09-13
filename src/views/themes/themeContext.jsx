import React, {createContext, useContext, useEffect, useState} from 'react';
import {lightTheme, darkTheme} from './color';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider = ({children}) => {
  const [currentTheme, setCurrentTheme] = useState(lightTheme);

  useEffect(() => {
    async function loadTheme() {
      try {
        const savedTheme = await AsyncStorage.getItem('theme');
        if (savedTheme !== null) {
          switch (savedTheme) {
            case 'light':
              setCurrentTheme(lightTheme);
              break;
            case 'dark':
              setCurrentTheme(darkTheme);
              break;
          }
        }
      } catch (e) {
        console.error('Error loading theme:', e);
      }
    }

    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newTheme = currentTheme === lightTheme ? 'dark' : 'light';
    setCurrentTheme(newTheme == 'dark' ? darkTheme : lightTheme);

    try {
      await AsyncStorage.setItem('theme', newTheme);
    } catch (e) {
      console.error('Error saving theme:', e);
    }
  };

  return (
    <ThemeContext.Provider value={{currentTheme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};
