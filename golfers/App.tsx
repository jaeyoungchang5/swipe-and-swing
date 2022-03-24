import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';

import { AppNav } from './src/navigation/App';

export default function App() {
  return (
    <SafeAreaProvider>
		<NativeBaseProvider>
			<NavigationContainer>
				<AppNav />
			</NavigationContainer>
		</NativeBaseProvider>
    </SafeAreaProvider>
	
  );
}