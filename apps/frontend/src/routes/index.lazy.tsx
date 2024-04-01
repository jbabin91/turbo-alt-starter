import { Button } from '@repo/ui';
import { createLazyFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

import viteLogo from '/vite.svg';

import reactLogo from '../assets/react.svg';

export const Route = createLazyFileRoute('/')({
  component: Index,
});

function Index() {
  const [count, setCount] = useState(0);
  return (
    <>
      <div className="mx-auto my-0 max-w-7xl flex-1 p-8 text-center">
        <div className="flex flex-row justify-center">
          <a href="https://vitejs.dev" rel="noreferrer" target="_blank">
            <img alt="Vite logo" className="logo" src={viteLogo} />
          </a>
          <a href="https://react.dev" rel="noreferrer" target="_blank">
            <img alt="React logo" className="logo react" src={reactLogo} />
          </a>
        </div>
        <h1 className="text-2xl font-semibold">Welcome Home!</h1>
        <div className="flex flex-col gap-4 p-[2em]">
          <div>
            <Button onClick={() => setCount((count) => count + 1)}>
              count is {count}
            </Button>
          </div>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="text-[#888]">
          Click on the Vite and React logos to learn more
        </p>
      </div>
      <nav className="order-first border-r border-zinc-300 p-2 dark:border-zinc-600 sm:w-32">
        Sidebar
      </nav>
      <aside className="border-l border-zinc-300 p-2 dark:border-zinc-600 sm:w-32">
        Right Sidebar
      </aside>
    </>
  );
}
