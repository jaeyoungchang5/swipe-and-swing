// external import
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// internal import
import { MatchesPage, ProfilePage } from '../../pages';

export function MatchNav({route}: any) {
    const appUserId: number = route.params.appUserId;

    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Match Screen'
                component={MatchesPage}
                initialParams={{appUserId: appUserId}}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name='Profile Screen'
                component={ProfilePage}
                initialParams={{appUserId: appUserId}}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    )
}