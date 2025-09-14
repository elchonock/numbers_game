import { GAME_SETTINGS } from '@/data/constants';
import GameOverScreen from '@/screens/game-over/screen';
import GameScreen from '@/screens/game/screen';
import StartScreen from '@/screens/start/screen';
import { THEME_COLORS } from '@/ui/theme';
import { FontdinerSwanky_400Regular } from '@expo-google-fonts/fontdiner-swanky';
import {
  Oxanium_200ExtraLight,
  Oxanium_300Light,
  Oxanium_400Regular,
  Oxanium_500Medium,
  Oxanium_600SemiBold,
  Oxanium_700Bold,
  Oxanium_800ExtraBold,
} from '@expo-google-fonts/oxanium';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

const getRandomNumber = (from: number, to: number) => Math.floor(Math.random() * (to - from + 1)) + from;

SplashScreen.preventAutoHideAsync();

const OXANIUM = {
  Oxanium_200: Oxanium_200ExtraLight,
  Oxanium_300: Oxanium_300Light,
  Oxanium_400: Oxanium_400Regular,
  Oxanium_500: Oxanium_500Medium,
  Oxanium_600: Oxanium_600SemiBold,
  Oxanium_700: Oxanium_700Bold,
  Oxanium_800: Oxanium_800ExtraBold,
} as const;

export type OxaniumFontVariants = keyof typeof OXANIUM;

type Screens = 'start' | 'game' | 'gameOver';
export type GuessType = 'lower' | 'greater';

export type GameState = {
  attempts: number;
  previousGuesses: number[];
  currentGuess: number;
  min: number;
  max: number;
};

const initialGameState: GameState = {
  currentGuess: 12,
  attempts: 0,
  previousGuesses: [],
  min: GAME_SETTINGS.MIN,
  max: GAME_SETTINGS.MAX,
};

export default function Index() {
  const [fontsLoaded, fontsError] = useFonts({
    FontdinerSwanky_400Regular,
    ...OXANIUM,
  });

  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [theNumber, setTheNumber] = useState<number | null>(null);
  const [currentScreen, setCurrentScreen] = useState<Screens>('start');

  const makeNewGuess = (min: number, max: number) => {
    if (min >= max) return min;

    let newGuess = getRandomNumber(min, max);

    if (newGuess === theNumber) {
      return newGuess;
    }

    if (gameState.previousGuesses.includes(newGuess)) {
      newGuess = makeNewGuess(min, max);
    }

    return newGuess;
  };

  const guessLower = () => {
    if (theNumber && gameState.currentGuess < theNumber) {
      console.log('Liar, liar, pants on fire!'); // to do
      return;
    }

    const newMin = gameState.min;
    const newMax = gameState.currentGuess;

    const newCurrentGuess = makeNewGuess(newMin, newMax);

    if (newCurrentGuess === theNumber) {
      setGameState((prev) => ({ ...prev, attempts: prev.attempts + 1, currentGuess: newCurrentGuess }));
      setCurrentScreen('gameOver');
    }

    setGameState((prev) => ({
      ...prev,
      currentGuess: newCurrentGuess,
      attempts: prev.attempts + 1,
      previousGuesses: [newCurrentGuess, ...prev.previousGuesses],
      min: newMin,
      max: newMax,
    }));
  };

  const guessHigher = () => {
    if (theNumber && gameState.currentGuess > theNumber) {
      console.log('Liar, liar, pants on fire!'); // to do
      return;
    }

    const newMin = gameState.currentGuess;
    const newMax = gameState.max;

    const newCurrentGuess = makeNewGuess(newMin, newMax);

    if (newCurrentGuess === theNumber) {
      setGameState((prev) => ({ ...prev, attempts: prev.attempts + 1, currentGuess: newCurrentGuess }));
      setCurrentScreen('gameOver');
    }

    setGameState((prev) => ({
      ...prev,
      currentGuess: newCurrentGuess,
      attempts: prev.attempts + 1,
      previousGuesses: [newCurrentGuess, ...prev.previousGuesses],
      min: newMin,
      max: newMax,
    }));
  };

  const makeInitialGuess = () => {
    const getFirstGuess = (min: number, max: number) => {
      if (min === max) return min;

      let firstGuess = getRandomNumber(min, max);

      if (firstGuess === theNumber) {
        firstGuess = getFirstGuess(min, max);
      }
      return firstGuess;
    };

    setGameState((prev) => {
      const newCurrentGuess = getFirstGuess(prev.min, prev.max);

      return {
        ...prev,
        currentGuess: newCurrentGuess,
        attempts: prev.attempts + 1,
        previousGuesses: [newCurrentGuess, ...prev.previousGuesses],
      };
    });

    return;
  };

  const isNumberValid = (number: number | null) => {
    return !!(
      typeof number === 'number' &&
      !isNaN(+number) &&
      number >= GAME_SETTINGS.MIN &&
      number <= GAME_SETTINGS.MAX
    );
  };

  const submitNumber = (number: typeof theNumber) => {
    if (isNumberValid(number)) {
      setTheNumber(number);
      makeInitialGuess();
      setCurrentScreen('game');
    }
  };

  const startOver = () => {
    setGameState(initialGameState);
    setTheNumber(null);
    setCurrentScreen('start');
  };

  useEffect(() => {
    if (fontsLoaded || fontsError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontsError]);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {currentScreen === 'start' && <StartScreen setNumber={submitNumber} />}

      {currentScreen === 'game' && (
        <GameScreen gameState={gameState} guessLower={guessLower} guessHigher={guessHigher} />
      )}

      {currentScreen === 'gameOver' && <GameOverScreen gameState={gameState} startOver={startOver} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: THEME_COLORS.ALL.purple,
  },
});
