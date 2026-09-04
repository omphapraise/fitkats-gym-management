/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        base: {
          950: '#0a0a0c',
          900: '#111113',
          800: '#18181b',
          700: '#212124',
          600: '#2c2c30',
          500: '#3d3d42',
        },
        accent: {
          DEFAULT: '#0a84ff',
          light: '#409cff',
          dim: '#0a84ff1a',
        },
        gold: {
          DEFAULT: '#c9a24b',
          light: '#e0c179',
        },
        success: '#30d158',
        warning: '#ff9f0a',
        danger: '#ff453a',
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Display"',
          '"SF Pro Text"',
          'Inter',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
        '4xl': '2.25rem',
      },
      boxShadow: {
        soft: '0 4px 24px rgba(0,0,0,0.35)',
        card: '0 8px 32px rgba(0,0,0,0.28)',
        glow: '0 0 40px rgba(10,132,255,0.25)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};