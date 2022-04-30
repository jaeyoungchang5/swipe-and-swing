// external import
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// internal import
import { UploadPage, SwipePage } from '../../pages';

export function SwipeNav({ route }: any) {
    const appUserId: number = route.params.appUserId;

    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Swipe Screen'
                component={SwipePage}
                initialParams={{appUserId: appUserId}}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name='Upload Screen'
                component={UploadPage}
                initialParams={{appUserId: appUserId}}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    )
}