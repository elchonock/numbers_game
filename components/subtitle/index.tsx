import MyText, { MyTextProps, TEXT_COLORS, TextColors } from '@/ui/text';
import { StyleSheet, View, ViewProps } from 'react-native';

interface SubTitleProps extends ViewProps {
  color?: TextColors;
  textProps?: MyTextProps;
}

const SubTitle = ({ color, style, children, textProps }: SubTitleProps) => {
  const {
    color: titleColor = 'white',
    size: titleSize = 'lg',
    weight: titleWeight = '500',
    ...restTextProps
  } = textProps || {};

  return (
    <View style={[styles.container, color && { backgroundColor: color }, style]}>
      <MyText color={titleColor} size={titleSize} weight={titleWeight} style={styles.title} {...restTextProps}>
        {children}
      </MyText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    backdropFilter: 'blur(10px)',
    backgroundColor: `${TEXT_COLORS.lightGray}30`,
  },
  title: {
    textAlign: 'center',
  },
});

export default SubTitle;
