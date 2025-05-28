import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AppState } from '../types';

interface AppContextType {
  state: AppState;
  updateAccessibility: (settings: Partial<AppState['accessibilitySettings']>) => void;
  setLastSubmittedWord: (word: string) => void;
  resetVisit: () => void;
}

const defaultState: AppState = {
  hasVisitedBefore: false,
  lastVisit: null,
  lastSubmittedWord: null,
  accessibilitySettings: {
    useOpenDyslexic: false,
    ambientSoundEnabled: false,
  }
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AppState>(() => {
    const savedState = localStorage.getItem('campus-studied-me-state');
    if (savedState) {
      const parsed = JSON.parse(savedState);
      if (parsed.lastVisit) {
        parsed.lastVisit = new Date(parsed.lastVisit);
      }
      return parsed as AppState;
    }
    return defaultState;
  });

  useEffect(() => {
    localStorage.setItem('campus-studied-me-state', JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    if (!state.hasVisitedBefore) {
      setState(prev => ({
        ...prev,
        hasVisitedBefore: true,
        lastVisit: new Date()
      }));
    }
  }, [state.hasVisitedBefore]);

  const updateAccessibility = (settings: Partial<AppState['accessibilitySettings']>) => {
    setState(prev => ({
      ...prev,
      accessibilitySettings: {
        ...prev.accessibilitySettings,
        ...settings
      }
    }));
  };

  const setLastSubmittedWord = (word: string) => {
    setState(prev => ({
      ...prev,
      lastSubmittedWord: word,
      lastVisit: new Date()
    }));
  };

  const resetVisit = () => {
    setState(prev => ({
      ...prev,
      lastVisit: new Date()
    }));
  };

  return (
    <AppContext.Provider value={{ state, updateAccessibility, setLastSubmittedWord, resetVisit }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};