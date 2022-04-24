// external import
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// internal import
import { UploadPage, SwipePage } from '../../pages';

export function SwipeNav() {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Swipe Screen'
                component={SwipePage}
                initialParams={{}}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name='Upload Screen'
                component={UploadPage}
                initialParams={{}}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    )
}