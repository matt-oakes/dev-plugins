import { Slot } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { useEffect } from 'react';

import { StatsEntrySelect } from '~/components/forms/StatsEntrySelect';
import { Page } from '~/components/Page';
import { QueryProvider } from '~/providers/query';
import { StatsEntryProvider } from '~/providers/stats';

import'@expo/styleguide/dist/expo-theme.css';
import '~/styles.css';
import { ModuleFilterProvider } from '~/providers/modules';

export default function RootLayout() {
  useWorkaroundForThemeClass();

  return (
    <QueryProvider>
      <StatsEntryProvider>
        <ModuleFilterProvider>
          <Page>
            <Page.Header>
              <StatsEntrySelect />
            </Page.Header>
            <Page.Content>
              <Slot />
            </Page.Content>
          </Page>
        </ModuleFilterProvider>
      </StatsEntryProvider>
    </QueryProvider>
  );
}

function useWorkaroundForThemeClass() {
  const { colorScheme } = useColorScheme();

  useEffect(() => {
    if (!!document.body) {
      document.body.classList.remove('light-theme', 'dark-theme');
      if (colorScheme) {
        document.body.className = `${colorScheme}-theme`;
      }
    }
  }, [colorScheme]);
}
