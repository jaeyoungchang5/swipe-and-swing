// external imports
import React, { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Entypo, Ionicons } from '@expo/vector-icons';
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
import { SwipeItem } from '../../components';
import { IMatch } from '../../interfaces'; 
import { acceptMatch, rejectMatch } from '../../middleware';

export function MatchProfile({route, navigation}: any) {

	const [golfer, setGolfer] = useState<IMatch>(route.params.match);

	useEffect(() => {
		// loadProfile();
	}, []);

	function handleRoutingBack() {
		navigation.pop(1);
	}

	function onAccept() {
		acceptMatch(golfer.match_id)
		.then(res => {
			navigation.pop(1);
		})
	}

	function onReject() {
		rejectMatch(golfer.match_id)
		.then(res => {
			navigation.pop(1);
		})
	}

    return (
        <ImageBackground
            source={require('../../../assets/bg.png')}
            style={styles.bg}
        >
            <SafeAreaView style={styles.container}>
				<View style={styles.top}>
                    <TouchableOpacity onPress={handleRoutingBack}>
                        <Text style={styles.icon}>
                            <Ionicons name="arrow-back" size={24} color="black" />
                        </Text>
                    </TouchableOpacity>
					
				</View>

				<ScrollView>

						<SwipeItem
							firstName={golfer.firstName}
							lastName={golfer.lastName}
							age={golfer.age}
							compatibility={golfer.compatibility}
							handicap={golfer.handicap}
							transport={golfer.transport}
							isDrinking={golfer.isDrinking}
							isBetting={golfer.isBetting}
							isMusic={golfer.isMusic}
							numHoles={golfer.numHoles}
							numPeople={golfer.numPeople}
							image={golfer.image}
                            profileView={true}
						/>
					
					
					{golfer?.matchStatus &&
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

							{golfer.matchStatus == 4 &&
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
										onPress={() => onReject()}
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
		paddingVertical: 30,
		justifyContent: 'center'
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
