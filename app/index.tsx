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
import { useEffect } from 'react';
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

export default function Index() {
  const [fontsLoaded, fontsError] = useFonts({
    FontdinerSwanky_400Regular,
    ...OXANIUM,
  });

  useEffect(() => {
    if (fontsLoaded || fontsError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontsError]);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#08d8ca',
  },
});
