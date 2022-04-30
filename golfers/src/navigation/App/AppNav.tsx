// external imports
import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { Text } from 'react-native';

// internal imports
import { ProfilePage, UploadPage } from '../../pages';
import { primary_color, dark_grey } from '../../options.json';
import { SwipeNav, MatchNav, SearchNav } from '../Pages';

export function AppNav({route}: any) {
    const appUserId: string = route.params.appUserId;
    
	const Tab = createBottomTabNavigator(); 
    
    return (
        <Tab.Navigator initialRouteName='Swipe'>
            <Tab.Screen 
                name='Swipe' 
                component={SwipeNav}
                options={{
                    headerShown: false,
                    tabBarLabel: ({focused, color}) => (
                        <Text style={{color: focused ? primary_color : color, fontSize: 10}}>Swipe</Text>
                    ),
                    tabBarIcon: (({focused, size}) => {
                        const iconFocused = focused ? primary_color : dark_grey
                        return <MaterialIcons name="home-filled" color={iconFocused} size={size}/>
                    })
                }}
                initialParams={{appUserId: appUserId}}
            />
            <Tab.Screen 
                name='Matches' 
                component={MatchNav}
                options={{
                    headerShown: false,
                    tabBarLabel: ({focused, color}) => (
                        <Text style={{color: focused ? primary_color : color, fontSize: 10}}>Matches</Text>
                    ),
                    tabBarIcon: (({focused, size}) => {
                        const iconFocused = focused ? primary_color : dark_grey
                        return <Ionicons name="golf" size={size} color={iconFocused} />
                    })
                }}
                initialParams={{appUserId: appUserId}}
            />
            <Tab.Screen 
                name='Upload' 
                component={UploadPage}
                options={{
                    headerShown: false,
                    tabBarLabel: ({focused, color}) => (
                        <Text style={{color: focused ? primary_color : color, fontSize: 10}}>Upload</Text>
                    ),
                    tabBarIcon: (({focused, size}) => {
                        const iconFocused = focused ? primary_color : dark_grey
                        return <AntDesign name="pluscircle" size={size} color={iconFocused} />
                    })
                }}
                initialParams={{appUserId: appUserId}}
            />
            <Tab.Screen 
                name='Search' 
                component={SearchNav}
                options={{
                    headerShown: false,
                    tabBarLabel: ({focused, color}) => (
                        <Text style={{color: focused ? primary_color : color, fontSize: 10}}>Search</Text>
                    ),
                    tabBarIcon: (({focused, size}) => {
                        const iconFocused = focused ? primary_color : dark_grey
                        return <Ionicons name="search-sharp" color={iconFocused} size={size}/>
                    })
                }}
                initialParams={{appUserId: appUserId}}
            />
            <Tab.Screen 
                name='Profile' 
                component={ProfilePage}
                options={{
                    headerShown: false,
                    tabBarLabel: ({focused, color}) => (
                        <Text style={{color: focused ? primary_color : color, fontSize: 10}}>Profile</Text>
                    ),
                    tabBarIcon: (({focused, size}) => {
                        const iconFocused = focused ? primary_color : dark_grey
                        return <FontAwesome name="user" color={iconFocused} size={size}/>
                    })
                }}
                initialParams={{appUserId: appUserId, golfer_id: appUserId, profileStatus: 0}}
            />
        </Tab.Navigator>
    )
}