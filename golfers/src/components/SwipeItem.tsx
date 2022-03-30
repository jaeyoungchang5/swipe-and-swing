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
        actions,
        description,
        image,
        matches,
        name,
        onPressLeft,
        onPressRight,
        status,
        variant
    }: any) {

    // Custom styling
    const fullWidth = Dimensions.get('window').width;
    const imageStyle = [
    {
        borderRadius: 8,
        width: variant ? fullWidth / 2 - 30 : fullWidth - 80,
        height: variant ? 170 : 350,
        margin: variant ? 0 : 20
    }
    ];

    const nameStyle = [
        {
        paddingTop: variant ? 10 : 15,
        paddingBottom: variant ? 5 : 7,
        color: dark_grey,
        fontSize: variant ? 15 : 30
        }
    ];

    return (
        <View style={styles.containerCardItem}>
        
        {/* IMAGE */}
        <Image source={image} style={imageStyle} />

        {/* MATCHES */}
        {matches && (
            <View style={styles.matchesCardItem}>
                <Text style={styles.matchesTextCardItem}>
                    {matches}% Match!
                </Text>
            </View>
        )}

        {/* NAME */}
        <Text style={nameStyle}>{name}</Text>

        {/* DESCRIPTION */}
        {description && (
            <Text style={styles.descriptionCardItem}>{description}</Text>
        )}

        {/* STATUS */}
        {status && (
            <View style={styles.status}>
                <View style={status === 'Online' ? styles.online : styles.offline} />
                <Text style={styles.statusText}>{status}</Text>
            </View>
        )}

        {/* ACTIONS */}
        {actions && (
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
        )}
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
		// fontFamily: icon_font,
		color: like_actions
	},
	dislike: {
		fontSize: 25,
		// fontFamily: icon_font,
		color: dislike_actions
	},
	flash: {
		// fontFamily: icon_font,
		color: flash_actions
	},

})