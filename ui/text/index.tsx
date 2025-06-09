import { OxaniumFontVariants } from '@/app';
import { THEME_COLORS } from '@/ui/theme';
import { StyleSheet, Text, TextProps } from 'react-native';

export const TEXT_COLORS = THEME_COLORS.ALL;

export type TextColors = keyof typeof TEXT_COLORS;

const FONT_SIZES = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
  '5xl': 48,
  '6xl': 60,
  '7xl': 72,
} as const;

type FontSizes = keyof typeof FONT_SIZES;

type FontWeightValues = '200' | '300' | '400' | '500' | '600' | '700' | '800';

type FontFamily = {
  [K in FontWeightValues]: OxaniumFontVariants;
};

export const FONT_FAMILY: FontFamily = {
  200: 'Oxanium_200',
  300: 'Oxanium_300',
  400: 'Oxanium_400',
  500: 'Oxanium_500',
  600: 'Oxanium_600',
  700: 'Oxanium_700',
  800: 'Oxanium_800',
} as const;

export interface MyTextProps extends TextProps {
  color?: TextColors;
  size?: FontSizes;
  weight?: FontWeightValues;
}

function MyText({ color, size, weight, children, style = {}, ...props }: MyTextProps) {
  return (
    <Text
      style={[
        styles.text,
        { color: TEXT_COLORS[color || 'black'] },
        { fontSize: FONT_SIZES[size || 'base'] },
        { fontFamily: FONT_FAMILY[weight || 400] },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {},
});

export default MyText;
