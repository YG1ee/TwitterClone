import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        foreground: '#f8f8f2',
        background: '#282a36',
        comment: '#6272a4',
        'current-line': '#44475a',
        'd-pink': '#ff79c6',
        'd-red': '#ff5555',
        'd-orange': '#ffb86c',
        'd-yellow': '#f1fa8c',
        'd-green': '#50fa7b',
        'd-cyan': '#8be9fd',
        'd-purple': '#bd93f9',
      },
    },
  },
  plugins: [],
};
export default config;
