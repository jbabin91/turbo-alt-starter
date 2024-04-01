import uiPreset from '@repo/ui/tailwind.config';
import { type Config } from 'tailwindcss';

export default {
  content: [...uiPreset.content],
  presets: [uiPreset],
} satisfies Config;
