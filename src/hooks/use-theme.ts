import { useEffect, useState } from 'react';
import { Platform, useColorScheme } from 'react-native';

import { Colors } from '@/constants/theme';
import type { Theme } from '@/constants/theme';

export function useTheme(): Theme {
  const scheme = useColorScheme();
  const [hasMounted, setHasMounted] = useState(Platform.OS !== 'web');

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Match the server theme before applying browser preferences.
    setHasMounted(true);
  }, []);

  // The server cannot detect the browser's appearance preference.
  return Colors[hasMounted && scheme === 'dark' ? 'dark' : 'light'];
}
