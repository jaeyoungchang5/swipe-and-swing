import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, ImageBackground } from 'react-native';
import { MaterialCommunityIcons, FontAwesome5, Ionicons, AntDesign } from '@expo/vector-icons';

import { black, alternate_color, like_actions, dislike_actions, white, dark_grey } from '../options.json';

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
	variant,
	profileView
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
		<ImageBackground imageStyle={styles.image} resizeMode='repeat' style={styles.containerCardItem} source={require('../../assets/background_dot.png')}>
        {/* <View style={styles.containerCardItem}> */}
        
			{/* IMAGE */}
			<Image source={image} style={imageStyle} />

			{compatibility &&
				<View style={styles.matchesCardItem}>
					<Text style={styles.matchesTextCardItem}>
						{Math.floor(Math.random() * (99 - 70 + 1) + 70)}% Match!
					</Text>
				</View>
			}

			<Text style={nameStyle}>{firstName} {lastName}{age && `, ${age}`}</Text>

			{!profileView ? 
				<View style={styles.settings}>
					{handicap ?
						<View style={styles.settingItem}>
							<Text>{handicap} H'Cap</Text>
						</View> : null
					}
					{transport?
						<View style={styles.settingItem}>
							<Text>{transport}</Text>
						</View> : null
					}
					{isDrinking ?
						<View style={styles.settingItem}>
							<Text>Drinking</Text>
						</View> : null
					}
					{isBetting ?
						<View style={styles.settingItem}>
							<Text>Betting</Text>
						</View> : null
					}
					{isMusic ?
						<View style={styles.settingItem}>
							<Text>Music</Text>
						</View> : null
					}
					{numHoles ?
						<View style={styles.settingItem}>
							<Text>{numHoles} Holes</Text>
						</View> : null
					}
					{numPeople ?
						<View style={styles.settingItem}>
							<Text>{numPeople} People</Text>
						</View> : null
					}
				</View>
			:
				<View style={styles.containerProfileItem}>

					<View style={styles.info}>
						<Text style={styles.iconProfile}>
							<FontAwesome5 name="golf-ball" size={15} color="black" />
						</Text>
						<Text style={styles.infoContent}>{handicap} Handicap</Text>
					</View>

					<View style={styles.info}>
						<Text style={styles.iconProfile}>
							<FontAwesome5 name="beer" size={15} color="black" />
						</Text>
						<Text style={styles.infoContent}>{isDrinking ? "Drinking" : "No drinking"}</Text>
					</View>
					<View style={styles.info}>
						<Text style={styles.iconProfile}>
							{transport == 'Carting' ?
								<MaterialCommunityIcons name="golf-cart" size={15} color="black" />
							:
								<FontAwesome5 name="walking" size={15} color="black" />
							}
						</Text>
						<Text style={styles.infoContent}>{transport}</Text>
					</View>
					<View style={styles.info}>
						<Text style={styles.iconProfile}>
							<Ionicons name="people-sharp" size={15} color="black" />
						</Text>
						<Text style={styles.infoContent}>{numPeople} People</Text>
					</View>
				</View>
			}

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
		</ImageBackground>
        );
    };

const styles = StyleSheet.create({
	image: {
		flex: 1,
		borderRadius: 8
	},
    containerCardItem: {
		backgroundColor: 'white',
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
	like: {
		fontSize: 25,
	},
	dislike: {
		fontSize: 25,
	},
	settingItem: {
		borderColor: dark_grey,
		backgroundColor: white,
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
	},
	info: {
		paddingVertical: 8,
		flexDirection: "row",
        // paddingLeft: 15,
		alignItems: "center",
        justifyContent: "center",
	},
	iconProfile: {
		fontSize: 12,
		color: dark_grey,
		paddingHorizontal: 10
	},
	infoContent: {
		color: 'black',
		fontSize: 13
	},
    username: {
        color: 'black',
        fontStyle: 'italic',
        // fontWeight: 'bold'
    },
	containerProfileItem: {
        flex: 1, 
		// backgroundColor: '',
		paddingBottom: 25,
		margin: 10,
        alignItems: "center",
		borderRadius: 8,
		shadowOpacity: 0.05,
		shadowRadius: 10,
		shadowColor: black,
		shadowOffset: { height: 0, width: 0 }
	},
	name: {
		color: dark_grey,
		fontSize: 25,
		textAlign: "center"
	},
})