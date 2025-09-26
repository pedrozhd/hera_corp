/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        animation: {
          'spin-slow': 'spin 3s linear infinite',
          'float': 'float 6s ease-in-out infinite',
          'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          'bounce-slow': 'bounce 3s infinite',
          'fade-in-out': 'fadeInOut 4s ease-in-out infinite',
          'slide-up': 'slideUp 2s ease-out',
          'heartbeat': 'heartbeat 2s ease-in-out infinite',
        },
        perspective: {
          '1000': '1000px',
        },
        rotate: {
          'y-180': 'rotateY(180deg)',
        },
        keyframes: {
          float: {
            '0%, 100%': { transform: 'translateY(0px)' },
            '50%': { transform: 'translateY(-20px)' },
          },
          fadeInOut: {
            '0%, 100%': { opacity: '0.1' },
            '50%': { opacity: '0.3' },
          },
          slideUp: {
            '0%': { transform: 'translateY(100px)', opacity: '0' },
            '100%': { transform: 'translateY(0px)', opacity: '1' },
          },
          heartbeat: {
            '0%, 100%': { transform: 'scale(1)' },
            '50%': { transform: 'scale(1.1)' },
          },
        },
        colors: {
          'medical-blue': {
            50: '#eff6ff',
            100: '#dbeafe',
            500: '#3b82f6',
            600: '#2563eb',
            700: '#1d4ed8',
            800: '#1e40af',
            900: '#1e3a8a',
          }
        }
      },
    },
    plugins: [],
  }
  