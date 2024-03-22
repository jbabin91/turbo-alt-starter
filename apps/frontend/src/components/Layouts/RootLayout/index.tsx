import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Suspense } from 'react';

import { Footer } from './Footer';
import { Header } from './Header';
import { Main } from './Main';

export function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <Main />
      <Footer />
      <Suspense>
        <TanStackRouterDevtools />
      </Suspense>
    </div>
  );
}
