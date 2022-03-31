import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';

import { white, black, dark_grey } from '../options.json';

export function City() {
    return (
        <TouchableOpacity style={styles.city}>
            <Entypo name="location-pin" size={20} color="black" />
            <Text style={styles.cityText}>
                South Bend
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    // COMPONENT - CITY
	city: {
		backgroundColor: white,
		alignItems: "center",
		justifyContent: "space-between",
		flexDirection: "row",
		paddingTop: 10,
		paddingBottom: 10,
		paddingRight: 15,
		paddingLeft: 15,
		borderRadius: 20,
		shadowOpacity: 0.05,
		shadowRadius: 10,
		shadowColor: black,
		shadowOffset: { height: 0, width: 0 },
	},
	cityText: {
		// fontFamily: ICON_FONT,
		color: dark_grey,
		fontSize: 13,
	},
})