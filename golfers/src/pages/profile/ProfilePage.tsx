// external imports
import React, { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SimpleLineIcons, Entypo, Ionicons } from '@expo/vector-icons';
import { Select } from 'native-base';
import * as Linking from 'expo-linking';

// internal imports
import {
    dark_grey,
	primary_color,
	alternate_color,
	white,
	like_actions,
	dislike_actions
} from '../../options.json';
import { ProfileItem } from '../../components';
import { IProfile } from '../../interfaces'; 
import { demoProfiles } from '../../demoData';
import { fakeAPICall } from '../../middleware';

export function ProfilePage({route, navigation}: any) {
	const golfer_id: number = route.params.golfer_id;
	const appUserId: number = route.params.appUserId;
	const profileStatus: number = route.params.profileStatus;

	const [golfer, setGolfer] = useState<IProfile>();
	const [service, setService] = useState<string>();

	useEffect(() => {
		if (service == 'logout') {
			console.log('logging out');
			navigation.replace('Auth');
		}
		loadProfile();
	}, [service]);

	function loadProfile() {
		fakeAPICall()
		.then(() => {
			setGolfer(demoProfiles[golfer_id]);
		})
	}

	function handleRoutingBack() {
		navigation.pop(1);
	}

	function onReject() {

	}

	function onAccept() {

	}

	function onRemove() {

	}

    return (
        <ImageBackground
            source={require('../../../assets/bg.png')}
            style={styles.bg}
        >
            <SafeAreaView style={styles.container}>
				<View style={styles.top}>
					{golfer_id == appUserId && profileStatus == 0 ?
						
						<Text style={styles.title}>Profile</Text>
					:
						<TouchableOpacity onPress={handleRoutingBack}>
							<Text style={styles.icon}>
								<Ionicons name="arrow-back" size={24} color="black" />
							</Text>
						</TouchableOpacity>
					}
					
					{golfer_id == appUserId ?
						<Select onValueChange={(value) => setService(value)} borderWidth={0} dropdownIcon={<Ionicons name="ios-settings" size={24} color="black" />}>
							<Select.Item label='Edit profile' value='editProfile' />
							<Select.Item label='Change password' value='changePassword' />
							<Select.Item label='Log out' value='logout' />
							<Select.Item label='Delete account' value='deleteAccount' />
						</Select>
					:
						<Select onValueChange={(value) => setService(value)} borderWidth={0} dropdownIcon={<SimpleLineIcons name="options-vertical" size={15} color="black" />}>
							<Select.Item label='Report' value='report' />
						</Select>
					}
				</View>

				<ScrollView>
					{golfer &&
						<ProfileItem
							golfer={golfer}
						/>
					}
					
					{profileStatus != 2 && golfer?.matchStatus &&
						<View style={styles.actionsProfile}>
							{golfer.matchStatus == 3 &&
								<View style={styles.actionsCardItem}>
									<TouchableOpacity
										style={styles.like_button}
										onPress={() => onAccept()}
									>
										<Text style={styles.iconButton}>
											<Entypo name="add-user" size={20} color={'white'} />
										</Text>
										<Text style={styles.textButton}>Accept</Text>
									</TouchableOpacity>

									<TouchableOpacity
										style={styles.dislike_button}
										onPress={() => onReject()}
									>
										<Text style={styles.iconButton}>
											<Entypo name="remove-user" size={20} color={'white'} />
										</Text>
										<Text style={styles.textButton}>Reject</Text>
									</TouchableOpacity>

								</View>
							}

							{golfer.matchStatus ==4 &&
								<View style={styles.actionsCardItem}>
									<TouchableOpacity 
										onPress={() => {
											Linking.openURL(`sms:+1${golfer.phoneNum}`)
										}}
										style={styles.roundedButton}
									>
										<Text style={styles.iconButton}>
											<Entypo name="message" size={24} color="white" />
										</Text>
										<Text style={styles.textButton}>Message</Text>
									</TouchableOpacity>
									<TouchableOpacity
										style={styles.dislike_button}
										onPress={() => onRemove()}
									>
										<Text style={styles.iconButton}>
											<Entypo name="remove-user" size={20} color={'white'} />
										</Text>
										<Text style={styles.textButton}>Remove</Text>
									</TouchableOpacity>
								</View>
								
							}
							
						</View>	
					}
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
		flex: 1,
		justifyContent: "space-between",
		paddingHorizontal: 10,
		height: '100%'
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
		backgroundColor: alternate_color,
		paddingHorizontal: 20
	},
	topIconLeft: {
		fontSize: 20,
		paddingLeft: 20,
		marginTop: -20
	},
	actionsCardItem: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 30
	},
	like_button: {
		justifyContent: "center",
		flexDirection: "row",
		alignItems: "center",
		marginLeft: 10,
		height: 50,
		borderRadius: 25,
		backgroundColor: like_actions,
		paddingHorizontal: 20
	},
	dislike_button: {
		justifyContent: "center",
		flexDirection: "row",
		alignItems: "center",
		marginLeft: 10,
		height: 50,
		borderRadius: 25,
		backgroundColor: dislike_actions,
		paddingHorizontal: 20
	},
	like: {
		// fontSize: 2,
		padding: 10,
		color: 'white'
	},
	dislike: {
		padding: 10,	
		color: 'white',
		// fontSize: 25,
	},
});
