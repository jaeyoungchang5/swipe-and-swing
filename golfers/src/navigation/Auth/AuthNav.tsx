// external imports
import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// internal imports
import { LoginPage, SignupPage } from '../../pages';
import { primary_color, dark_grey } from '../../options.json';
import { SwipeNav, MatchNav } from '../Pages';

export function AuthNav() {
    const AuthStack = createNativeStackNavigator();

    return (
        <AuthStack.Navigator>
            <AuthStack.Screen 
                name='Login Page'
                component={LoginPage}
                options={{
                    headerShown: false
                }}
            />
            <AuthStack.Screen 
                name='Signup Page'
                component={SignupPage}
                options={{
                    headerShown: false
                }}
            />
        </AuthStack.Navigator>
    )
}