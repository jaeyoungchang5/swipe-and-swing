// external imports
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, ScrollView, TouchableOpacity, ImageBackground, StyleSheet, Text, View, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SimpleLineIcons, Entypo } from '@expo/vector-icons';

// internal imports
import {
    dark_grey,
	primary_color,
	alternate_color,
	white
} from '../../options.json';
import { ProfileItem } from '../../components';

const profileData = {
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
};

export function ProfilePage() {
    return (
        <ImageBackground
            source={require('../../../assets/bg.png')}
            style={styles.bg}
        >
            <SafeAreaView style={styles.container}>
				<ScrollView>
					<View style={styles.containerMatches}>
						<View style={styles.top}>
							<Text style={styles.title}>Profile</Text>
							<TouchableOpacity>
								<Text style={styles.icon}>
									<SimpleLineIcons name="options-vertical" size={15} color="black" />
								</Text>
							</TouchableOpacity>
						</View>
						<ProfileItem
							profile={profileData}
						/>

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

});
