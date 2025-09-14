import MyText from '@/ui/text';
import { THEME_COLORS } from '@/ui/theme';
import { StyleSheet, View } from 'react-native';

interface GuessProps {
  guess: number;
}

const Guess = ({ guess }: GuessProps) => {
  return (
    <View style={styles.container}>
      <MyText color="white" weight="700" size="4xl">
        {guess}
      </MyText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100,
    aspectRatio: '1 / 1',
    backgroundColor: THEME_COLORS.ALL.green,
    borderRadius: 999,
    borderWidth: 2,
    borderBottomWidth: 8,
    borderColor: THEME_COLORS.ALL.orange,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Guess;
