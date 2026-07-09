/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Brand blue (from logo)
        brand: {
          50:  '#e8f4fd',
          100: '#bde0f9',
          200: '#91ccf5',
          300: '#5eb4f0',
          400: '#38a0eb',
          500: '#2a8fd6',  // core blue
          600: '#1f7bc2',
          700: '#1565a8',
          800: '#0d508e',
          900: '#063a72',
        },
        // Brand crimson/red (from logo)
        crimson: {
          50:  '#fdf0f0',
          100: '#f9d4d4',
          200: '#f3a8a8',
          300: '#e97070',
          400: '#dc4545',
          500: '#c0392b',  // core red
          600: '#a63224',
          700: '#8a281e',
          800: '#6e1f18',
          900: '#521712',
        },
        // Neutral dark
        slate: {
          850: '#1a2130',
          950: '#0d1117',
        }
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace'],
        sans:  ['Inter', 'sans-serif'],
      },
      animation: {
        'float-slow': 'float 7s ease-in-out infinite',
        'float-mid':  'float 5s ease-in-out infinite 1.5s',
        'float-fast': 'float 4s ease-in-out infinite 0.75s',
        'scan':       'scan 3s ease-in-out infinite',
        'glow-pulse': 'glowPulse 2.5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-18px)' },
        },
        scan: {
          '0%, 100%': { backgroundPosition: '0% 0%' },
          '50%':      { backgroundPosition: '0% 100%' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(42, 143, 214, 0.4)' },
          '50%':      { boxShadow: '0 0 40px rgba(42, 143, 214, 0.7)' },
        },
      },
    },
  },
  plugins: [],
}
