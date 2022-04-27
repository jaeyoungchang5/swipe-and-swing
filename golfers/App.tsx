import React, { useState, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AppNav } from './src/navigation/App';
import { AppLoadingPage } from './src/pages';
import { AuthNav } from './src/navigation';

export default function App() {
	const [appUserId, setAppUserId] = useState<string>('');

	useEffect(() => {

	}, [appUserId]);

	const Stack = createNativeStackNavigator();

	return (
		<SafeAreaProvider>
			<NativeBaseProvider>
				<NavigationContainer>
					<StatusBar barStyle={"dark-content"} hidden={false} translucent={true} />
					<Stack.Navigator initialRouteName='AppLoading'>
						<Stack.Screen
							name='AppLoading'
							component={AppLoadingPage}
							options={{
								headerShown: false
							}}
						/>
						<Stack.Screen
							name='App'
							component={AppNav}
							initialParams={{appUserId: appUserId}}
							options={{
								headerShown: false
							}}
						/>
						<Stack.Screen
							name='Auth'
							component={AuthNav}
							options={{
								headerShown: false
							}}
						/>
					</Stack.Navigator>
				</NavigationContainer>
			</NativeBaseProvider>
		</SafeAreaProvider>

	);
}