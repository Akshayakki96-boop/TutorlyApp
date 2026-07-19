/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#004aad',
          700: '#003380',
          800: '#1e1b4b',
          900: '#0f0a2e',
        },
      },
      fontFamily: {
        sans:    ['Inter', 'Segoe UI', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'Inter', 'sans-serif'],
      },
      animation: {
        'fade-in':    'fadeIn 0.5s ease-out both',
        'slide-up':   'slideUp 0.6s ease-out both',
        'float':      'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'blink':      'blink 1.4s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)'    },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)'    },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)'    },
          '50%':     { transform: 'translateY(-12px)' },
        },
        blink: {
          '0%,100%': { opacity: '1'  },
          '50%':     { opacity: '0.3' },
        },
      },
      boxShadow: {
        card:       '0 4px 20px rgba(0,0,0,0.07)',
        'card-hover': '0 12px 36px rgba(0,0,0,0.14)',
        'glow-blue':  '0 0 24px rgba(0,74,173,0.35)',
        'glow-purple':'0 0 24px rgba(124,58,237,0.35)',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg,#004aad 0%,#1a237e 55%,#6b21a8 100%)',
      },
    },
  },
  plugins: [],
}
