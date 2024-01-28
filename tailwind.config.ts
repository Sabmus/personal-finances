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
        background: 'hsl(var(--color-background) / <alpha-value>)',
        foreground: 'hsl(var(--color-foreground) / <alpha-value>)',
        accent: 'hsl(var(--color-accent) / <alpha-value>)',
        'accent-hover': 'hsl(var(--color-accent-hover))',
        'accent-darker': 'hsl(var(--color-accent-darker))',
        surface: 'hsl(var(--color-surface))',
        'surface-hover': 'hsl(var(--color-surface-hover))',
        'surface-foreground': 'hsl(var(--color-surface-foreground))',
        error: 'hsl(var(--color-error))',
        'error-hover': 'hsl(var(--color-error-hover))',
        success: 'hsl(var(--color-success))',
      },
      keyframes: {
        'fade-in-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      animation: {
        'fade-in-down': 'fade-in-down 0.3s ease-out',
        'fade-in-up': 'fade-in-up 0.3s ease-out',
      },
    },
  },
  plugins: [],
};
export default config;
