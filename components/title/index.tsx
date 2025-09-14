import MyText, { FONT_SIZES, MyTextProps, TEXT_COLORS, TextColors } from '@/ui/text';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, View, ViewProps } from 'react-native';

interface TitleProps extends ViewProps {
  color?: TextColors;
  textProps?: MyTextProps;
}

const Title = ({ color = 'orange', style, children, textProps }: TitleProps) => {
  const { size = '3xl', weight: titleWeight = '700', ...restTextProps } = textProps || {};

  return (
    <View style={[styles.container, style]}>
      <MaterialCommunityIcons name="approximately-equal-box" size={FONT_SIZES[size] * 1.2} color={TEXT_COLORS[color]} />

      <MyText color={color} size={size} weight={titleWeight} style={styles.title} {...restTextProps}>
        {children}
      </MyText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    padding: 12,
  },
  title: {
    textAlign: 'center',
  },
});

export default Title;
