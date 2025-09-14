import { GameState } from '@/app';
import Guess from '@/components/guess';
import SubTitle from '@/components/subtitle';
import Title from '@/components/title';
import MyButton from '@/ui/button';
import List from '@/ui/list';
import MyText from '@/ui/text';
import { THEME_COLORS } from '@/ui/theme';
import { MaterialIcons } from '@expo/vector-icons';
import { nanoid } from 'nanoid';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import 'react-native-get-random-values';

interface GameScreenProps {
  gameState: GameState;
  guessLower: () => void;
  guessHigher: () => void;
}

const GameScreen = ({ gameState, guessLower, guessHigher }: GameScreenProps) => {
  const prevAttemptsList = gameState.previousGuesses.map((g, i) => ({
    id: nanoid(),
    title: g,
    number: gameState.previousGuesses.length - i,
  }));

  return (
    <View style={styles.container}>
      <Title color="red">PLAY</Title>
      <SubTitle style={{ width: '100%' }}>I will guess your number!</SubTitle>

      <View style={styles.guessContainer}>
        <SubTitle style={{ width: '100%' }}>Is your number lower or greater than?</SubTitle>
        <View style={styles.buttonsContainer}>
          <MyButton onPress={guessLower} iconName="squared-minus" color="white" style={styles.button} />

          <Guess guess={gameState.currentGuess} />

          <MyButton onPress={guessHigher} iconName="squared-plus" color="white" style={styles.button} />
        </View>
      </View>

      <View style={styles.attemptsContainer}>
        <View style={styles.attempts}>
          <MaterialIcons name="history" size={24} color="white" />
          <MyText color="white" size="xl" weight="500">
            Previous attempts:
          </MyText>
        </View>

        <List items={prevAttemptsList.slice(1)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    gap: 24,
    alignItems: 'center',
    padding: 16,
  },
  guessContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
    backgroundColor: THEME_COLORS.ALL.blue,
    borderRadius: 12,
    padding: 20,
    paddingVertical: 24,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  attemptsContainer: {
    gap: 16,
    paddingTop: 20,
    borderTopWidth: 2,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: THEME_COLORS.ALL.blue,
    flex: 1,
  },
  attempts: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  button: {},
});

export default GameScreen;
