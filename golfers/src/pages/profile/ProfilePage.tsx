// external imports
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, ScrollView, TouchableOpacity, ImageBackground, StyleSheet, Text, View, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, SimpleLineIcons, Entypo, Ionicons } from '@expo/vector-icons';

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

export function ProfilePage({route, navigation}: any) {
	const golfer_id: number = route.params.golfer_id;
	const appUserId: number = 0;
	const [golfer, setGolfer] = useState<IProfile>();

	useEffect(() => {
		setGolfer(demoProfiles[golfer_id]);
	}, []);

	function handleRoutingBack() {
		navigation.navigate('Match Screen');
	}

	function onReject() {

	}

	function onAccept() {

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
							{golfer_id == appUserId ?
								
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
						{golfer &&
							<ProfileItem
								golfer={golfer}
							/>
						}
						
						
						{golfer?.profileStatus == 0 &&
							<View style={styles.actionsProfile}>
								<TouchableOpacity style={styles.logoutButton}>
									<Text style={styles.iconButton}>
										<MaterialIcons name="logout" size={24} color={white} />
									</Text>
									<Text style={styles.textButton}>Logout</Text>
								</TouchableOpacity>
							</View>
						}
						{golfer?.matchStatus &&
							<View style={styles.actionsProfile}>
								{golfer.matchStatus == 3 &&
									<View style={styles.actionsCardItem}>
										<TouchableOpacity
											style={styles.like_button}
											onPress={() => onAccept()}
										>
											<Text style={styles.like}>
												<Entypo name="add-user" size={20} color={'white'} /> Accept
											</Text>
										</TouchableOpacity>

										<TouchableOpacity style={styles.dislike_button} onPress={() => onReject()}>
											<Text style={styles.dislike}>
												<Entypo name="remove-user" size={20} color={'white'} /> Reject
											</Text>
										</TouchableOpacity>

									</View>
								}

								{golfer.matchStatus ==4 &&
									<TouchableOpacity style={styles.roundedButton}>
										<Text style={styles.iconButton}>
											<Entypo name="message" size={24} color="white" />
										</Text>
										<Text style={styles.textButton}>Message</Text>
									</TouchableOpacity>
								}
								
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
		height: 60,
		borderRadius: 30,
		backgroundColor: like_actions,
		marginHorizontal: 7,
		alignItems: "center",
		justifyContent: "center",

	},
	dislike_button: {
		height: 60,
		borderRadius: 30,
		backgroundColor: dislike_actions,
		marginHorizontal: 7,
		alignItems: "center",
		justifyContent: "center",
	},
	like: {
		// fontSize: 25,
		padding: 10,
		color: 'white'
	},
	dislike: {
		padding: 10,	
		color: 'white'
		// fontSize: 25,
	},
});
