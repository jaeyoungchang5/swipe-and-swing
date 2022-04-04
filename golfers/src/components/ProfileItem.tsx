import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons, AntDesign, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'; 

import { alternate_color, dark_grey, grey, primary_color, white, black } from '../options.json';

interface IProfile {
    firstName: string,
    lastName: string,
    image: any,
    age: number,
    handicap: number,
    defaultFormality: string,
    defaultCarting: boolean,
    defaultDrinking: boolean,
    defaultNumHoles: number,
    defaultNumPeople: number,
    status: number, // 0 - app user, 1 - potential match, 2 - random find
    match?: number
}

interface ProfilePageProps {
    profile: IProfile
}

export function ProfileItem({ profile }: ProfilePageProps ) {
    return (
        <View style={styles.containerProfileItem}>
            <Image source={profile.image} style={styles.imageStyle} />
            
            {(profile.status == 1 || profile.status == 2) &&
                <View style={styles.matchesProfileItem}>
                    <Text style={styles.matchesTextProfileItem}>
                        {profile.match}% Match!
                    </Text>
                </View>
            }
            <View style={styles.info}>
                <Text style={styles.iconProfile}>
                    <AntDesign name="user" size={25} color="black" />
                </Text>
                <Text style={styles.name}>{profile.firstName} {profile.lastName}, {profile.age}</Text>
            </View>

            <View style={styles.info}>
                <Text style={styles.iconProfile}>
                    <FontAwesome5 name="golf-ball" size={15} color="black" />
                </Text>
                <Text style={styles.infoContent}>{profile.handicap} Handicap</Text>
            </View>

            <View style={styles.info}>
                <Text style={styles.iconProfile}>
                    <FontAwesome5 name="beer" size={15} color="black" />
                </Text>
                <Text style={styles.infoContent}>{profile.defaultDrinking ? "Drinking" : "No drinking"}</Text>
            </View>

            <View style={styles.info}>
                <Text style={styles.iconProfile}>
                    {profile.defaultCarting ?
                        <MaterialCommunityIcons name="golf-cart" size={15} color="black" />
                    :
                        <FontAwesome5 name="walking" size={15} color="black" />
                    }
                </Text>
                <Text style={styles.infoContent}>{profile.defaultCarting ? "Carting" : "Walking"}</Text>
            </View>

            <View style={styles.info}>
                <Text style={styles.iconProfile}>
                    <Ionicons name="people-sharp" size={15} color="black" />
                </Text>
                <Text style={styles.infoContent}>{profile.defaultNumPeople} People</Text>
            </View>

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
		color: grey,
		fontSize: 13
	},
})