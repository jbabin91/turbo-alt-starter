import { Outlet } from '@tanstack/react-router';

export function Main() {
  return (
    <main className="flex flex-1 flex-col sm:flex-row">
      <Outlet />
    </main>
  );
}
