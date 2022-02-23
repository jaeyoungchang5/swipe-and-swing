// external imports
import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons';

// internal imports
import { SwipePage, NotifsPage, ProfilePage, SearchPage } from '../../pages';

export function AppNav({route}: any) {
	const Tab = createBottomTabNavigator(); 
    
    return (
        <Tab.Navigator initialRouteName='Swipe'>
            <Tab.Screen 
                name='Swipe' 
                component={SwipePage}
                options={{
                    tabBarIcon: (({focused, color, size}) => {
                        return <MaterialIcons name="home-filled" size={size} />
                    })
                }}
            />
            <Tab.Screen 
                name='Search' 
                component={SearchPage}
                options={{
                    tabBarIcon: (({focused, color, size}) => {
                        return <Ionicons name="search-sharp" size={size} />
                    })
                }}
            />
            <Tab.Screen 
                name='Profile' 
                component={ProfilePage}
                options={{
                    tabBarIcon: (({focused, color, size}) => {
                        return <FontAwesome name="user" size={size} />
                    })
                }}
            />
        </Tab.Navigator>
    )
}