// external imports
import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons';

// internal imports
import { SwipePage, MatchesPage, ProfilePage, SearchPage } from '../../pages';
import { primary_color, dark_grey } from '../../options.json';

export function AppNav({route}: any) {
	const Tab = createBottomTabNavigator(); 
    
    return (
        <Tab.Navigator initialRouteName='Swipe'>
            <Tab.Screen 
                name='Swipe' 
                component={SwipePage}
                options={{
                    tabBarIcon: (({focused, size}) => {
                        const iconFocused = focused ? primary_color : dark_grey
                        return <MaterialIcons name="home-filled" color={iconFocused} size={size}/>
                    })
                }}
            />
            <Tab.Screen 
                name='Matches' 
                component={MatchesPage}
                options={{
                    tabBarIcon: (({focused, size}) => {
                        const iconFocused = focused ? primary_color : dark_grey
                        return <Ionicons name="golf" size={size} color={iconFocused} />
                    })
                }}
            />
            <Tab.Screen 
                name='Search' 
                component={SearchPage}
                options={{
                    tabBarIcon: (({focused, size}) => {
                        const iconFocused = focused ? primary_color : dark_grey
                        return <Ionicons name="search-sharp" color={iconFocused} size={size}/>
                    })
                }}
            />
            <Tab.Screen 
                name='Profile' 
                component={ProfilePage}
                options={{
                    tabBarIcon: (({focused, size}) => {
                        const iconFocused = focused ? primary_color : dark_grey
                        return <FontAwesome name="user" color={iconFocused} size={size}/>
                    })
                }}
            />
        </Tab.Navigator>
    )
}