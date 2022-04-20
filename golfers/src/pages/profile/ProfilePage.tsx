// external imports
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, ScrollView, TouchableOpacity, ImageBackground, StyleSheet, Text, View, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SimpleLineIcons, Entypo, Ionicons } from '@expo/vector-icons';

// internal imports
import {
    dark_grey,
	primary_color,
	alternate_color,
	white,
	dislike_actions
} from '../../options.json';
import { ProfileItem } from '../../components';

const demoData = [
	{
		_id: 0,
		firstName: "Ramzi",
		lastName: "Bualuan",
		age: 35,
		image: require('../../../assets/Ramzi.jpeg'),
		handicap: 20,
		defaultFormality: "casual",
		defaultCarting: true,
		defaultDrinking: true,
		defaultNumHoles: 18,
		defaultNumPeople: 4,
		status: 0,
		match: 99
	},
	{
        _id: 1,
        firstName: "Andy",
        lastName: "Rocks",
        age: 22,
        image: require('../../../assets/Andy.jpg'),
        handicap: 19,
        defaultFormality: 'casual',
        defaultCarting: true,
        defaultDrinking: true,
        defaultNumHoles: 18,
        defaultNumPeople: 4,
        status: 0,
        match: 88
    },
    {
        _id: 2,
        firstName: "Timmy",
        lastName: "Gallagher",
        age: 21,
        image: require('../../../assets/Timmy.jpg'),
        handicap: 20,
        defaultFormality: 'casual',
        defaultCarting: false,
        defaultDrinking: false,
        defaultNumHoles: 9,
        defaultNumPeople: 2,
        status: 0,
        match: 70
    },
    {
        _id: 3,
        firstName: "JaeYoung",
        lastName: "Chang",
        age: 21,
        image: require('../../../assets/Jae.png'),
        handicap: 21,
        defaultFormality: 'casual',
        defaultCarting: false,
        defaultDrinking: true,
        defaultNumHoles: 9,
        defaultNumPeople: 4,
        status: 0,
        match: 90
    },
];

export function ProfilePage({route, navigation}: any) {
	const _id: number = route.params._id;
	const appUserId: number = 0;

	function handleRoutingBack() {
		navigation.navigate('Match Screen');
	}

    return (
        <ImageBackground
            source={require('../../../assets/bg.png')}
            style={styles.bg}
        >
            <SafeAreaView style={styles.container}>
				<ScrollView>
					<View style={styles.containerMatches}>
						<View style={styles.top}>
							{_id == appUserId ?
								
								<Text style={styles.title}>Profile</Text>
							:
								<TouchableOpacity onPress={handleRoutingBack}>
									<Text style={styles.icon}>
										<Ionicons name="arrow-back" size={24} color="black" />
									</Text>
								</TouchableOpacity>
							}
							<TouchableOpacity>
								<Text style={styles.icon}>
									<SimpleLineIcons name="options-vertical" size={15} color="black" />
								</Text>
							</TouchableOpacity>
						</View>
						<ProfileItem
							profile={demoData[_id]}
						/>

						{_id == appUserId ?
							<View style={styles.actionsProfile}>
								<TouchableOpacity style={styles.logoutButton}>
									<Text style={styles.iconButton}>
										<Entypo name="add-user" size={24} color="white" />
									</Text>
									<Text style={styles.textButton}>Logout</Text>
								</TouchableOpacity>
							</View>
						:
							<View style={styles.actionsProfile}>
								<TouchableOpacity style={styles.roundedButton}>
									<Text style={styles.iconButton}>
										<Entypo name="add-user" size={24} color="white" />
									</Text>
									<Text style={styles.textButton}>Add</Text>
								</TouchableOpacity>

								<TouchableOpacity style={styles.roundedButton}>
									<Text style={styles.iconButton}>
										<Entypo name="message" size={24} color="white" />
									</Text>
									<Text style={styles.textButton}>Message</Text>
								</TouchableOpacity>
							</View>	
						}
						
					</View>
				</ScrollView>
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
	// CONTAINER - GENERAL
	bg: {
		flex: 1,
		resizeMode: "cover"
	},
	container: {
		flex: 1
	},
    // CONTAINER - MATCHES
	containerMatches: {
		justifyContent: "space-between",
		flex: 1,
		paddingHorizontal: 10
	},
    top: {
		paddingTop: 10,
		marginHorizontal: 10,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center"
	},
    title: { paddingBottom: 10, fontSize: 22, color: dark_grey },
    icon: {
		fontSize: 20,
		color: dark_grey,
		paddingRight: 10
	},
	actionsProfile: {
		justifyContent: "center",
		flexDirection: "row",
		alignItems: "center"
	},
	iconButton: { fontSize: 20, color: white },
	textButton: {
		fontSize: 15,
		color: white,
		paddingLeft: 10
	},
	circledButton: {
		width: 50,
		height: 50,
		borderRadius: 25,
		backgroundColor: primary_color,
		justifyContent: "center",
		alignItems: "center",
		marginRight: 10
	},
	roundedButton: {
		justifyContent: "center",
		flexDirection: "row",
		alignItems: "center",
		marginLeft: 10,
		height: 50,
		borderRadius: 25,
		backgroundColor: alternate_color,
		paddingHorizontal: 20
	},
	logoutButton: {
		justifyContent: "center",
		flexDirection: "row",
		alignItems: "center",
		marginLeft: 10,
		height: 50,
		borderRadius: 25,
		backgroundColor: dislike_actions,
		paddingHorizontal: 20
	},
	topIconLeft: {
		fontSize: 20,
		paddingLeft: 20,
		marginTop: -20
	},
});
