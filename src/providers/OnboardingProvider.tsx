import React, {createContext, useContext, useMemo} from 'react';
import {useAsyncStorageState} from '../hooks/useAsyncStorageState';
import {STORAGE_KEYS} from '../config/storageKeys';

type OnboardingContextValue = {
  completed: boolean;
  loaded: boolean;
  markCompleted: () => void;
};

const OnboardingContext = createContext<OnboardingContextValue | null>(null);

export const OnboardingProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const {state, update, loaded} = useAsyncStorageState<boolean>(
    STORAGE_KEYS.onboarding,
    false,
  );

  const value = useMemo<OnboardingContextValue>(
    () => ({
      completed: state,
      loaded,
      markCompleted: () => update(true),
    }),
    [state, loaded, update],
  );

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const ctx = useContext(OnboardingContext);
  if (!ctx) {
    throw new Error('useOnboarding must be used within OnboardingProvider');
  }
  return ctx;
};
