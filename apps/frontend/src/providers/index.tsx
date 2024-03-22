import { ThemeProvider } from '@repo/ui';

import { TanStackRouterProvider } from './TanStackRouterProvider';

export function Providers() {
  return (
    <ThemeProvider>
      <TanStackRouterProvider />
    </ThemeProvider>
  );
}
