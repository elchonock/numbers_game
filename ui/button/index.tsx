import MyText, { MyTextProps, TEXT_COLORS, TextColors } from '@/ui/text';
import { THEME_COLORS } from '@/ui/theme';
import { Pressable, PressableProps, StyleSheet, View } from 'react-native';

const BUTTON_COLORS = {
  black: THEME_COLORS.ALL.black,
  white: THEME_COLORS.ALL.white,
  blue: THEME_COLORS.ALL.blue,
  green: THEME_COLORS.ALL.green,
  red: THEME_COLORS.ALL.red,
  orange: THEME_COLORS.ALL.orange,
} as const;

type ButtonColors = keyof typeof BUTTON_COLORS;

const TITLE_COLORS = {
  white: TEXT_COLORS.white,
  black: TEXT_COLORS.black,
  orange: TEXT_COLORS.orange,
} as const;

type TitleColors = keyof typeof TITLE_COLORS;

const mapTitleColors: { [K in ButtonColors]: TitleColors } = {
  black: 'orange',
  white: 'black',
  blue: 'white',
  green: 'black',
  red: 'white',
  orange: 'white',
} as const;

const getTitleColor = (buttonColor: ButtonColors): TextColors => {
  return mapTitleColors[buttonColor];
};

interface MyButtonProps extends PressableProps {
  title: string;
  color?: ButtonColors;
  titleProps?: MyTextProps;
}

function MyButton({
  title = '',
  color = 'orange',
  disabled,
  children,
  accessibilityLabel,
  titleProps,
  style,
  ...props
}: MyButtonProps) {
  const backgroundColor = BUTTON_COLORS[color];
  const titleColor = getTitleColor(color);

  return (
    <Pressable
      disabled={disabled}
      accessible
      accessibilityLabel={accessibilityLabel || `${title} Button`}
      style={({ pressed }) => [{ opacity: pressed && !disabled ? 0.7 : 1 }, styles.pressable, style]}
      {...props}
    >
      <View style={{ paddingBottom: 4 }}>
        <View
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor,
            filter: 'brightness(50%)',
            borderRadius: 16,
          }}
        />

        <View style={[styles.container, { backgroundColor, opacity: disabled ? 0.6 : 1 }]}>
          {/* <Image style={{ width: 20, height: 20 }} source={require('@/assets/images/favicon.png')} /> */}
          <MyText color={titleColor} size="lg" weight="600" {...titleProps}>
            {title}
          </MyText>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
    minWidth: 64,
    borderRadius: 16,
    boxShadow: 'rgba(0, 0, 0, 0.18) 0px 1px 4px',
  },
  title: {},
  pressable: {},
});

export default MyButton;
