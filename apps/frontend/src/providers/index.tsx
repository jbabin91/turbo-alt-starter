import { ThemeProvider } from '@repo/ui/components/theme-provider';

export function Providers({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
