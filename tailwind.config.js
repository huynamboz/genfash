import nativewindPreset from 'nativewind/preset';
import { platformSelect } from 'nativewind/theme';

const sizeConfig = {
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  7: '28px',
  8: '32px',
  9: '36px',
  10: '40px',
  11: '44px',
  12: '48px',
  13: '52px',
  14: '56px',
  15: '60px',
  16: '64px',
  17: '68px',
  18: '72px',
  19: '76px',
  20: '80px',
  21: '84px',
  22: '88px',
  23: '92px',
  24: '96px',
  25: '100px',
  26: '104px',
};

const borderRadiusConfig = {
  DEFAULT: 'var(--border-radius)',
  xs: '1px',
  sm: '2px',
  md: '6px',
  lg: '8px',
  xl: '12px',
  full: '9999px',
  none: '0',
};

const fontSizeConfig = {
  xs: ['12px', '16px'], // fontSize: 12px, lineHeight: 16px
  sm: ['14px', '20px'], // fontSize: 14px, lineHeight: 20px
  base: ['16px', '24px'], // fontSize: 16px, lineHeight: 24px
  lg: ['18px', '28px'], // fontSize: 18px, lineHeight: 28px
  xl: ['20px', '30px'], // fontSize: 20px, lineHeight: 30px
  '2xl': ['24px', '32px'], // fontSize: 24px, lineHeight: 32px
  '3xl': ['30px', '36px'], // fontSize: 30px, lineHeight: 36px
  '4xl': ['36px', '42px'], // fontSize: 36px, lineHeight: 42px
  '5xl': ['48px', '56px'], // fontSize: 48px, lineHeight: 56px
  '6xl': ['64px', '72px'], // fontSize: 64px, lineHeight: 72px
};

export default {
  // NOTE: Update this to include the paths to all of your component files.
  presets: [nativewindPreset],
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './src/presentation/**/*.{js,ts,jsx,tsx}',
    './App.tsx',
    './index.js',
    './global.css',
  ],

  theme: {
    extend: {
      width: sizeConfig,
      height: sizeConfig,
      padding: sizeConfig,
      margin: sizeConfig,
      maxWidth: sizeConfig,
      maxHeight: sizeConfig,
      minWidth: sizeConfig,
      minHeight: sizeConfig,
      gap: sizeConfig,
      space: sizeConfig,
      inset: sizeConfig,
      top: sizeConfig,
      right: sizeConfig,
      bottom: sizeConfig,
      left: sizeConfig,
      translate: sizeConfig,
      size: sizeConfig,
      borderWidth: sizeConfig,
      borderRadius: borderRadiusConfig,
      fontSize: fontSizeConfig,
      colors: {
        primary: {
          12: 'var(--primary-12)',
          11: {
            DEFAULT: 'var(--primary-11)',
            alpha: 'var(--primary-11-alpha)',
          },
          9: 'var(--primary-9)',
          8: {
            DEFAULT: 'var(--primary-8)',
            alpha: 'var(--primary-8-alpha)',
          },
          5: {
            DEFAULT: 'var(--primary-5)',
            alpha: 'var(--primary-5-alpha)',
          },
          4: {
            DEFAULT: 'var(--primary-4)',
            alpha: 'var(--primary-4-alpha)',
          },
          3: {
            DEFAULT: 'var(--primary-3)',
            alpha: 'var(--primary-3-alpha)',
          },
          2: 'var(--primary-2)',
          DEFAULT: 'var(--primary)',
        },
        success: 'var(--success)',
        warning: 'var(--warning)',
        error: {
          DEFAULT: 'var(--error)',
          2: 'var(--error-2)',
          9: 'var(--error-9)',
          10: 'var(--error-10)',
          11: 'var(--error-11)',
          alpha: {
            9: 'var(--error-alpha-9)',
            8: 'var(--error-alpha-8)',
            3: 'var(--error-alpha-3)',
          },
        },
        yellow: 'var(--yellow)',
        pink: 'var(--pink)',
        purple: 'var(--purple)',
        'gray-1': 'var(--gray-1)',
        'gray-2': 'var(--gray-2)',
        'gray-3': 'var(--gray-3)',
        'gray-4': 'var(--gray-4)',
        'off-white': 'var(--off-white)',
        neutral: {
          11: 'var(--neutral-11)',
          12: 'var(--neutral-12)',
          alpha: {
            DEFAULT: 'var(--neutral-alpha)',
            2: 'var(--neutral-alpha-2)',
            3: 'var(--neutral-alpha-3)',
            4: 'var(--neutral-alpha-4)',
            9: 'var(--neutral-alpha-9)',
            8: 'var(--neutral-alpha-8)',
            11: 'var(--neutral-alpha-11)',
          },
        },
        tomato: {
          alpha: {
            11: 'var(--tomato-alpha-11)',
            3: 'var(--tomato-alpha-3)',
          },
        },
        black: {
          DEFAULT: 'var(--black)',
          alpha: {
            6: 'var(--black-alpha-6)',
          },
        },
      },
      fontFamily: {
        system: platformSelect({
          ios: 'BricolageGrotesqueRegular',
          android: 'BricolageGrotesqueRegular',
          default: 'BricolageGrotesqueRegular',
        }),
        sans: ['BricolageGrotesque-Regular'],
        default: ['BricolageGrotesque-Regular'],
        bold: ['BricolageGrotesque-Bold'],
        semibold: ['BricolageGrotesque-SemiBold'],
        medium: ['BricolageGrotesque-Medium'],
        light: ['BricolageGrotesque-Light'],
        thin: ['BricolageGrotesque-Thin'],
        black: ['BricolageGrotesque-Black'],
      },
    },
  },
  plugins: [],
};
