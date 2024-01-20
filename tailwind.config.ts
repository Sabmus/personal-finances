import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['class'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        background: 'hsl(var(--color-background))',
        foreground: 'hsl(var(--color-foreground))',
        accent: 'hsl(var(--color-accent))',
        'accent-hover': 'hsl(var(--color-accent-hover))',
        surface: 'hsl(var(--color-surface))',
        'surface-hover': 'hsl(var(--color-surface-hover))',
        'surface-foreground': 'hsl(var(--color-surface-foreground))',
        error: 'hsl(var(--color-error))',
        success: 'hsl(var(--color-success))',
      },
    },
  },
  plugins: [],
};
export default config;
