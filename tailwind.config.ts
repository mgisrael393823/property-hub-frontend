import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        xl: '1400px',
      },
    },
    extend: {
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['"Space Grotesk"', 'monospace'],
      },
      colors: {
        brand: {
          primary: '#6C47FF',
          secondary: '#F5F3FF',
          background: '#F9FAFB',
          surface: '#FFFFFF',
          success: '#10B981',
          error: '#EF4444',
        },
        text: {
          primary: '#1F2937',
          secondary: '#6B7280',
          light: '#E5E7EB',
          link: '#6C47FF',
        },
        border: {
          default: '#E5E7EB',
        },
        gray: {
          100: '#F3F4F6',
          200: '#E5E7EB',
          500: '#6B7280',
          700: '#374151',
        },
      },
      borderRadius: {
        lg: '0.75rem',
        xl: '1rem',
        '2xl': '1.25rem',
        full: '9999px',
      },
      boxShadow: {
        sm: '0 1px 2px rgba(0, 0, 0, 0.04)',
        DEFAULT: '0 2px 6px rgba(0, 0, 0, 0.08)',
        md: '0 4px 10px rgba(0, 0, 0, 0.08)',
        lg: '0 10px 20px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [],
};

export default config;
