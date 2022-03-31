import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';

import { 
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
		image,
		name,
		caption,
		match,
		handicap,
		transport,
		isDrinking,
		isBetting,
		num_holes,
		num_people,
		distance,
		isMusic,
		onPressLeft,
		onPressRight
    }: any) {

    // Custom styling
    const fullWidth = Dimensions.get('window').width;
    const imageStyle = [
    {
        borderRadius: 8,
        width: fullWidth -80,
        height: 350,
        margin: 20
    }
    ];

    const nameStyle = [
        {
        paddingTop: 15,
        paddingBottom: 7,
        color: dark_grey,
        fontSize: 30
        }
    ];

    return (
        <View style={styles.containerCardItem}>
        
			{/* IMAGE */}
			<Image source={image} style={imageStyle} />

			<View style={styles.matchesCardItem}>
				<Text style={styles.matchesTextCardItem}>
					{match}% Match!
				</Text>
			</View>

			<Text style={nameStyle}>{name}</Text>

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
				{num_holes && 
					<View style={styles.settingItem}>
						<Text>{num_holes} Holes</Text>
					</View>
				}
				{num_people && 
					<View style={styles.settingItem}>
						<Text>{num_people} People</Text>
					</View>
				}
				{isMusic && 
					<View style={styles.settingItem}>
						<Text>Music</Text>
					</View>
				}
			</View>

			<View style={styles.actionsCardItem}>

				<TouchableOpacity style={styles.button} onPress={() => onPressLeft()}>
					<Text style={styles.like}>
						<AntDesign name="dislike1" size={24} color="red" />
					</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.button}
					onPress={() => onPressRight()}
				>
					<Text style={styles.dislike}>
						<Ionicons name="golf" size={24} color="green" />
					</Text>
				</TouchableOpacity>

			</View>
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
		backgroundColor: primary_color,
		paddingVertical: 7,
		paddingHorizontal: 20,
		borderRadius: 20
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