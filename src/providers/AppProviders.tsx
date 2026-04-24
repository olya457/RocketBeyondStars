import React from 'react';
import {BookmarksProvider} from './BookmarksProvider';
import {OnboardingProvider} from './OnboardingProvider';

export const AppProviders: React.FC<{children: React.ReactNode}> = ({
  children,
}) => (
  <OnboardingProvider>
    <BookmarksProvider>{children}</BookmarksProvider>
  </OnboardingProvider>
);
