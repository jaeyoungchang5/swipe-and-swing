// external import
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// internal import
import { SearchPage } from '../../pages';

export function SearchNav() {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Search Screen'
                component={SearchPage}
                initialParams={{}}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    )
}