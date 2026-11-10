export const Colors = {
  light: {
    text: '#252525',
    muted: '#737373',
    background: '#FFFFFF',
    card: '#F5F5F5',
    border: '#E5E5E5',
    primary: '#292929',
    onPrimary: '#FFFFFF',
  },
  dark: {
    text: '#F5F5F5',
    muted: '#A3A3A3',
    background: '#15171A',
    card: '#24272B',
    border: '#383C42',
    primary: '#D0D3D8',
    onPrimary: '#17191C',
  },
} as const;

export type Theme = (typeof Colors)[keyof typeof Colors];

export const Spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 } as const;
export const FontSize = { small: 13, body: 16, title: 20, hero: 28 } as const;
export const Radius = { sm: 8, md: 12, pill: 999 } as const;
