// external import
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// internal import
import { ProfilePage, SearchPage } from '../../pages';

export function SearchNav({ route } : any ) {
    const appUserId: number = route.params.appUserId;

    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Search Screen'
                component={SearchPage}
                initialParams={{appUserId: appUserId}}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name='Profile Search Screen'
                component={ProfilePage}
                initialParams={{appUserId: appUserId}}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    )
}