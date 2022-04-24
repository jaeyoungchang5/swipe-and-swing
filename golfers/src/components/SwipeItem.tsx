import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';

import { 
	alternate_color,
    flash_actions, 
    dislike_actions, 
    like_actions, 
    star_actions,
    online_status, 
    offline_status, 
    grey, 
    white, 
    primary_color, 
    dark_grey 
} from '../options.json';

export function SwipeItem({
	match_id,
	golfer_id,
	firstName,
	lastName,
	age,
	compatibility,
	handicap,
	transport,
	isDrinking,
	isBetting,
	isMusic,
	numHoles,
	numPeople,
	image,
	onPressLeft,
	onPressRight,
	actions,
	variant
}: any) {

    // Custom styling
    const fullWidth = Dimensions.get('window').width;
    const imageStyle = [
		{
			borderRadius: variant ? 0 : 8,
			borderTopLeftRadius: 8,
			borderTopRightRadius: 8,
			width: variant ? fullWidth / 2 - 30 : fullWidth -80,
			height: variant ? 170 : 325,
			margin: variant ? 0 : 20
		}
    ];
	
	const nameStyle = [
		{
			paddingTop: variant ? 5 : 0,
			paddingBottom: variant ? 5 : 7,
			color: '#363636',
			fontSize: variant ? 15 : 30
		}
	];

    return (
        <View style={styles.containerCardItem}>
        
			{/* IMAGE */}
			<Image source={image} style={imageStyle} />

			{compatibility &&
				<View style={styles.matchesCardItem}>
					<Text style={styles.matchesTextCardItem}>
						{compatibility}% Match!
					</Text>
				</View>
			}

			<Text style={nameStyle}>{firstName} {lastName}</Text>

			{/* {caption &&
				<Text style={styles.descriptionCardItem}>{caption}</Text>
			} */}

			<View style={styles.settings}>
				{handicap &&
					<View style={styles.settingItem}>
						<Text>{handicap} H'Cap</Text>
					</View>
				}
				{transport &&
					<View style={styles.settingItem}>
						<Text>{transport}</Text>
					</View>
				}
				{isDrinking && 
					<View style={styles.settingItem}>
						<Text>Drinking</Text>
					</View>
				}
				{isBetting && 
					<View style={styles.settingItem}>
						<Text>Betting</Text>
					</View>
				}
				{isMusic && 
					<View style={styles.settingItem}>
						<Text>Music</Text>
					</View>
				}
				{numHoles && 
					<View style={styles.settingItem}>
						<Text>{numHoles} Holes</Text>
					</View>
				}
				{numPeople && 
					<View style={styles.settingItem}>
						<Text>{numPeople} People</Text>
					</View>
				}
			</View>

			{actions &&
				<View style={styles.actionsCardItem}>

					<TouchableOpacity style={styles.button} onPress={() => onPressLeft()}>
						<Text style={styles.dislike}>
							<AntDesign name="dislike1" size={24} color={dislike_actions} />
						</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.button}
						onPress={() => onPressRight()}
					>
						<Text style={styles.like}>
							<Ionicons name="golf" size={24} color={like_actions} />
						</Text>
					</TouchableOpacity>

				</View>
			}
		</View>
        );
    };

const styles = StyleSheet.create({
    containerCardItem: {
		backgroundColor: "#FFF",
		borderRadius: 8,
		alignItems: "center",
		margin: 10,
		shadowOpacity: 0.05,
		shadowRadius: 10,
		shadowColor: "#000",
		shadowOffset: { height: 0, width: 0 }
	},
	matchesCardItem: {
		marginTop: -35,
		backgroundColor: alternate_color,
		paddingVertical: 7,
		paddingHorizontal: 20,
		borderRadius: 20,
		marginBottom: 15
	},
	matchesTextCardItem: {
		// fontFamily: icon_font,
		color: white
	},
	descriptionCardItem: {
		color: grey,
		textAlign: "center"
	},
	status: {
		paddingBottom: 10,
		flexDirection: "row",
		alignItems: "center"
	},
	statusText: {
		color: grey,
		fontSize: 12
	},
	online: {
		width: 6,
		height: 6,
		backgroundColor: online_status,
		borderRadius: 3,
		marginRight: 4
	},
	offline: {
		width: 6,
		height: 6,
		backgroundColor: offline_status,
		borderRadius: 3,
		marginRight: 4
	},
	actionsCardItem: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 30
	},
	button: {
		width: 60,
		height: 60,
		borderRadius: 30,
		backgroundColor: white,
		marginHorizontal: 7,
		alignItems: "center",
		justifyContent: "center",
		shadowOpacity: 0.15,
		shadowRadius: 20,
		shadowColor: dark_grey,
		shadowOffset: { height: 10, width: 0 }
	},
    miniButton: {
		width: 40,
		height: 40,
		borderRadius: 30,
		backgroundColor: white,
		marginHorizontal: 7,
		alignItems: "center",
		justifyContent: "center",
		shadowOpacity: 0.15,
		shadowRadius: 20,
		shadowColor: dark_grey,
		shadowOffset: { height: 10, width: 0 }
	},
	star: {
		// fontFamily: icon_font,
		color: star_actions
	},
	like: {
		fontSize: 25,
	},
	dislike: {
		fontSize: 25,
	},
	flash: {
		// fontFamily: icon_font,
		color: flash_actions
	},
	settingItem: {
		borderColor: dark_grey,
		borderWidth: 0.8,
		borderRadius: 10,
		paddingLeft: 10,
		paddingRight: 10,
		paddingTop: 5,
		paddingBottom: 5,
		marginRight: 5,
		marginTop: 5
	},
	settings: {
		justifyContent: "center",
		flexDirection: "row",
		flexWrap: "wrap"
	}
})