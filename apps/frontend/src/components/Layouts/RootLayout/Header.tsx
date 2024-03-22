import { ModeToggle } from '@repo/ui';
import { Link } from '@tanstack/react-router';

export function Header() {
  return (
    <header className="flex justify-between border-b border-zinc-300 px-4 py-2 dark:border-zinc-600">
      <nav className="flex gap-2 p-2">
        <Link className="[&.active]:font-bold" to="/">
          Home
        </Link>
        <Link className="[&.active]:font-bold" to="/about">
          About
        </Link>
      </nav>
      <ModeToggle />
    </header>
  );
}
