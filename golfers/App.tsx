import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';

import { AppNav } from './src/navigation/App';

export default function App() {
  return (
    <SafeAreaProvider>
		<NativeBaseProvider>
			<NavigationContainer>
				<StatusBar barStyle={"dark-content"} hidden={false} translucent={true} />
				<AppNav />
			</NavigationContainer>
		</NativeBaseProvider>
    </SafeAreaProvider>
	
  );
}