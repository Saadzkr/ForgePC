import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          glow: 'hsl(var(--primary-glow))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        terminal: {
          bg: 'hsl(var(--terminal-bg))',
          fg: 'hsl(var(--terminal-fg))',
          green: 'hsl(var(--terminal-green))',
          amber: 'hsl(var(--terminal-amber))',
          red: 'hsl(var(--terminal-red))',
          blue: 'hsl(var(--terminal-blue))',
        },
        crt: {
          phosphor: 'hsl(var(--crt-phosphor))',
          scanline: 'hsl(var(--crt-scanline))',
          vignette: 'hsl(var(--crt-vignette))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        pixel: ['var(--font-pixel)', 'Press Start 2P', 'monospace'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'Fira Code', 'monospace'],
        sans: ['var(--font-sans)', 'Space Grotesk', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Orbitron', 'system-ui', 'sans-serif'],
        editorial: ['var(--font-editorial)', 'Playfair Display', 'serif'],
      },
      fontSize: {
        'xs': ['0.7rem', { lineHeight: '1.4', letterSpacing: '0.05em' }],
        'sm': ['0.8rem', { lineHeight: '1.5', letterSpacing: '0.03em' }],
        'base': ['0.9rem', { lineHeight: '1.6', letterSpacing: '0.02em' }],
        'lg': ['1.1rem', { lineHeight: '1.5', letterSpacing: '0.01em' }],
        'xl': ['1.4rem', { lineHeight: '1.4', letterSpacing: '0.01em' }],
        '2xl': ['1.8rem', { lineHeight: '1.3', letterSpacing: '0em' }],
        '3xl': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        '4xl': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.03em' }],
        '5xl': ['5rem', { lineHeight: '1', letterSpacing: '-0.04em' }],
      },
      spacing: {
        '0': '0',
        '1': '0.25rem',
        '2': '0.5rem',
        '3': '0.75rem',
        '4': '1rem',
        '5': '1.25rem',
        '6': '1.5rem',
        '8': '2rem',
        '10': '2.5rem',
        '12': '3rem',
        '16': '4rem',
        '20': '5rem',
        '24': '6rem',
        '32': '8rem',
      },
      boxShadow: {
        'crt': 'inset 0 0 60px hsl(var(--crt-vignette)), inset 0 0 200px hsl(var(--crt-vignette) / 0.3)',
        'switch': 'inset 0 -3px 0 hsl(var(--border)), inset 0 2px 4px hsl(var(--background) / 0.5), 0 2px 8px hsl(var(--foreground) / 0.1)',
        'switch-active': 'inset 0 3px 6px hsl(var(--foreground) / 0.3), 0 0 20px hsl(var(--primary-glow) / 0.4)',
        'knob': '0 3px 6px hsl(var(--foreground) / 0.3), inset 0 -2px 4px hsl(var(--foreground) / 0.2)',
        'crt-screen': 'inset 0 0 40px hsl(var(--crt-vignette)), 0 10px 40px hsl(var(--foreground) / 0.3)',
        'panel': 'inset 0 1px 0 hsl(var(--border) / 0.5), 0 4px 20px hsl(var(--foreground) / 0.15)',
      },
      backgroundImage: {
        'scanlines': 'repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(var(--crt-scanline) / 0.08) 2px, hsl(var(--crt-scanline) / 0.08) 4px)',
        'noise': 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
        'grid': 'linear-gradient(hsl(var(--border) / 0.1) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border) / 0.1) 1px, transparent 1px)',
        'radial-glow': 'radial-gradient(ellipse at center, hsl(var(--primary-glow) / 0.15) 0%, transparent 70%)',
      },
      backgroundSize: {
        'grid': '40px 40px',
        'scanlines': '100% 4px',
      },
      animation: {
        'scanline': 'scanline 8s linear infinite',
        'flicker': 'flicker 0.15s infinite alternate',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'switch-flip': 'switch-flip 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
        'knob-turn': 'knob-turn 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-up': 'slide-up 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-down': 'slide-down 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-left': 'slide-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-right': 'slide-right 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        'scale-in': 'scale-in 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        'fade-in': 'fade-in 0.3s ease-out',
        'fade-out': 'fade-out 0.2s ease-in',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 3s linear infinite',
        'crt-warmup': 'crt-warmup 1.5s ease-out forwards',
        'terminal-type': 'terminal-type 0.03s steps(1) forwards',
      },
      keyframes: {
        scanline: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '0 100%' },
        },
        flicker: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0.95' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        'switch-flip': {
          '0%': { transform: 'rotateX(0deg)' },
          '50%': { transform: 'rotateX(90deg)' },
          '100%': { transform: 'rotateX(0deg)' },
        },
        'knob-turn': {
          '0%': { transform: 'rotate(-135deg)' },
          '100%': { transform: 'rotate(135deg)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-down': {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-left': {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'slide-right': {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-out': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        'crt-warmup': {
          '0%': { transform: 'scaleY(0.01)', opacity: '0', filter: 'blur(10px)' },
          '50%': { transform: 'scaleY(1.02)', opacity: '0.8', filter: 'blur(2px)' },
          '100%': { transform: 'scaleY(1)', opacity: '1', filter: 'blur(0)' },
        },
        'terminal-type': {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
      },
      transitionTimingFunction: {
        'mechanical': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'mechanical-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        'fast': '100ms',
        'normal': '200ms',
        'slow': '300ms',
        'mechanical': '150ms',
      },
      zIndex: {
        'crt': '10',
        'scanlines': '20',
        'noise': '30',
        'modal': '40',
        'toast': '50',
        'cursor': '60',
      },
    },
  },
  plugins: [],
}
export default config