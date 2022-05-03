import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { Entypo, Ionicons, AntDesign, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'; 

import { alternate_color, dark_grey, grey, white, black } from '../options.json';
import { IProfile } from '../interfaces';
import { reverseGeocode } from '../utils/location';

interface ProfilePageProps {
    golfer: IProfile,
    profileStatus: number,
}

export function ProfileItem({ golfer, profileStatus }: ProfilePageProps ) {
    const [city, setCity] = useState<string>();

    useEffect(() => {
        reverseGeocode(Number(golfer.latitude), Number(golfer.longitude))
        .then(res => {
            setCity(res);
        })
    }, []);

    return (
        <View style={styles.containerProfileItem}>
            <Image source={golfer.image} style={styles.imageStyle} />
            
            {(profileStatus != 0 && golfer.profileStatus != 0) ?
                <View style={styles.matchesProfileItem}>
                    <Text style={styles.matchesTextProfileItem}>
                        {Math.floor(Math.random() * (99 - 70 + 1) + 70)}% Match!
                    </Text>
                </View> : null
            }
            <View style={styles.info}>
                <Text style={styles.name}>{golfer.firstName} {golfer.lastName}, {golfer.age}</Text>
            </View>

            <View style={styles.info}>
                <Text style={styles.iconProfile}>
                    <AntDesign name="user" size={15} color="black" />
                </Text>
                <Text style={styles.username}>{golfer.username}</Text>
            </View>

            {city ?
                <View style={styles.info}>
                    <Text style={styles.iconProfile}>
                        <Entypo name="location-pin" size={15} color="black" />
                    </Text>
                    <Text style={styles.infoContent}>{city}</Text>
                </View> : null
            }

            <View style={styles.info}>
                <Text style={styles.iconProfile}>
                    <FontAwesome5 name="golf-ball" size={15} color="black" />
                </Text>
                <Text style={styles.infoContent}>{golfer.handicap} Handicap</Text>
            </View>

            {profileStatus == 1 ? 
                <View style={styles.info}>
                    <Text style={styles.iconProfile}>
                        <FontAwesome5 name="beer" size={15} color="black" />
                    </Text>
                    <Text style={styles.infoContent}>{golfer.isDrinking ? "Drinking" : "No drinking"}</Text>
                </View> : null
            }
            {profileStatus == 1 ? 
                <View style={styles.info}>
                    <Text style={styles.iconProfile}>
                        {golfer.transport == 'Carting' ?
                            <MaterialCommunityIcons name="golf-cart" size={15} color="black" />
                        :
                            <FontAwesome5 name="walking" size={15} color="black" />
                        }
                    </Text>
                    <Text style={styles.infoContent}>{golfer.transport}</Text>
                </View> : null
            }
            {profileStatus == 1 ? 
                <View style={styles.info}>
                    <Text style={styles.iconProfile}>
                        <Ionicons name="people-sharp" size={15} color="black" />
                    </Text>
                    <Text style={styles.infoContent}>{golfer.numPeople} People</Text>
                </View> : null
            }
        </View>
    );
};

const styles = StyleSheet.create({
    // COMPONENT - PROFILE ITEM
	containerProfileItem: {
        flex: 1, 
		backgroundColor: white,
		paddingBottom: 25,
		margin: 10,
        alignItems: "center",
		borderRadius: 8,
		shadowOpacity: 0.05,
		shadowRadius: 10,
		shadowColor: black,
		shadowOffset: { height: 0, width: 0 }
	},
    imageStyle: {
        borderRadius: 8,
        width: Dimensions.get('window').width - 80,
        height: 325,
        margin: 20
    },
	matchesProfileItem: {
		width: 131,
		marginTop: -35,
		backgroundColor: alternate_color,
		paddingVertical: 7,
		paddingHorizontal: 20,
		borderRadius: 20,
		textAlign: "center",
		alignSelf: "center"
	},
	matchesTextProfileItem: {
		color: white
	},
	name: {
		color: dark_grey,
		fontSize: 25,
		textAlign: "center"
	},
	descriptionProfileItem: {
		color: grey,
		textAlign: "center",
		paddingBottom: 20,
		fontSize: 13
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
    }
})