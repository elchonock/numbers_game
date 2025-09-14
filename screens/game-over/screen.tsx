import { GameState } from '@/app';
import MyButton from '@/ui/button';
import MyText from '@/ui/text';
import { Image, StyleSheet, View } from 'react-native';

interface GameOverScreenProps {
  gameState: GameState;
  startOver: () => void;
}

const GameOverScreen = ({ gameState, startOver }: GameOverScreenProps) => {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/goal_reached.gif')} style={styles.image} />

      <MyText color="white" size="2xl" weight="600">
        Game Over
      </MyText>

      <MyText color="white" size="2xl" weight="600">
        Your number is: {gameState.currentGuess}
      </MyText>

      <MyText color="green" size="xl" weight="600">
        Attempts:
      </MyText>
      <MyText color="green" size="xl" weight="500">
        {gameState.attempts}
      </MyText>

      <MyButton onPress={startOver} title="Start Over" iconName="back" color="white" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 99999,
  },
});

export default GameOverScreen;
