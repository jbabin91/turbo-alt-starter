import baseConfig from '@repo/tailwind-config/base';
import type { Config } from 'tailwindcss';

export default {
  content: ['src/**/*.{ts,tsx}'],
  presets: [baseConfig],
} satisfies Config;
