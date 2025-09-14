import { GAME_SETTINGS } from '@/data/constants';
import { FONT_FAMILY } from '@/ui/text';
import { THEME_COLORS } from '@/ui/theme';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';

const maxLength = GAME_SETTINGS.MAX.toString().length;

function NumericInput({ style = {}, ...props }: TextInputProps) {
  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, style]}
        maxLength={maxLength}
        keyboardType="number-pad"
        autoCorrect={false}
        cursorColor={THEME_COLORS.ALL.purple}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: (100 * maxLength) / 2,
  },
  input: {
    textAlign: 'center',
    color: THEME_COLORS.ALL.green,
    fontFamily: FONT_FAMILY[600],
    fontSize: 32,
    fontWeight: 500,
    borderWidth: 1,
    borderBottomWidth: 4,
    borderColor: THEME_COLORS.ALL.green,
    borderRadius: 999,
    padding: 12,
    width: '100%',
    backgroundColor: THEME_COLORS.ALL.white,
  },
});

export default NumericInput;
