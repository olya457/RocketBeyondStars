import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
} from 'react';
import {useAsyncStorageState} from '../hooks/useAsyncStorageState';
import {STORAGE_KEYS} from '../config/storageKeys';

type BookmarksContextValue = {
  locations: string[];
  stories: string[];
  facts: string[];
  isLocationSaved: (id: string) => boolean;
  isStorySaved: (id: string) => boolean;
  isFactSaved: (id: string) => boolean;
  toggleLocation: (id: string) => void;
  toggleStory: (id: string) => void;
  toggleFact: (id: string) => void;
};

const BookmarksContext = createContext<BookmarksContextValue | null>(null);

const toggleInList = (list: string[], id: string) =>
  list.includes(id) ? list.filter(x => x !== id) : [...list, id];

export const BookmarksProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const locationsStore = useAsyncStorageState<string[]>(
    STORAGE_KEYS.savedLocations,
    [],
  );
  const storiesStore = useAsyncStorageState<string[]>(
    STORAGE_KEYS.savedStories,
    [],
  );
  const factsStore = useAsyncStorageState<string[]>(
    STORAGE_KEYS.savedFacts,
    [],
  );

  const toggleLocation = useCallback(
    (id: string) => locationsStore.update(prev => toggleInList(prev, id)),
    [locationsStore],
  );
  const toggleStory = useCallback(
    (id: string) => storiesStore.update(prev => toggleInList(prev, id)),
    [storiesStore],
  );
  const toggleFact = useCallback(
    (id: string) => factsStore.update(prev => toggleInList(prev, id)),
    [factsStore],
  );

  const value = useMemo<BookmarksContextValue>(
    () => ({
      locations: locationsStore.state,
      stories: storiesStore.state,
      facts: factsStore.state,
      isLocationSaved: id => locationsStore.state.includes(id),
      isStorySaved: id => storiesStore.state.includes(id),
      isFactSaved: id => factsStore.state.includes(id),
      toggleLocation,
      toggleStory,
      toggleFact,
    }),
    [
      locationsStore.state,
      storiesStore.state,
      factsStore.state,
      toggleLocation,
      toggleStory,
      toggleFact,
    ],
  );

  return (
    <BookmarksContext.Provider value={value}>
      {children}
    </BookmarksContext.Provider>
  );
};

export const useBookmarks = () => {
  const ctx = useContext(BookmarksContext);
  if (!ctx) {
    throw new Error('useBookmarks must be used within BookmarksProvider');
  }
  return ctx;
};
