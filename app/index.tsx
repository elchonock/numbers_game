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

type GameProgress = 'notStarted' | 'inProgress' | 'finished';
type Screens = 'start' | 'game' | 'gameOver';

type GameState = {
  progress: GameProgress;
  screen: Screens;
  attempts: number;
  guesses: number[];
};

const initialGameState: GameState = { progress: 'notStarted', screen: 'start', attempts: 0, guesses: [] };

export default function Index() {
  const [fontsLoaded, fontsError] = useFonts({
    FontdinerSwanky_400Regular,
    ...OXANIUM,
  });

  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [theNumber, setTheNumber] = useState<number | null>(null);

  const isNumberValid = (number: number | string | null) => {
    return !!(typeof number === 'number' && !isNaN(+number) && +number > 0 && +number < 100);
  };

  useEffect(() => {
    if (isNumberValid(theNumber)) {
      setGameState((prev) => ({ ...prev, progress: 'inProgress', screen: 'game' }));
    }
  }, [theNumber]);

  useEffect(() => {
    if (fontsLoaded || fontsError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontsError]);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      {gameState.screen === 'start' && <StartScreen setNumber={setTheNumber} />}
      {gameState.screen === 'game' && <GameScreen />}
      {gameState.screen === 'gameOver' && <GameOverScreen />}
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
