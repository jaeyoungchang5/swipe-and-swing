import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';

import { alternate_color, white, black, dark_grey } from '../../options.json';
import { getCurrentLocation } from '../../utils';

export function City({appUserId}: any) {

	useEffect(() => {
		getCurrentLocation()
		.then(res => {
			// use location to get current city
		})
	}, []);

    return (
        <TouchableOpacity style={styles.city}>
            <Entypo name="location-pin" size={20} color={white} />
            <Text style={styles.cityText}>
                South Bend
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    // COMPONENT - CITY
	city: {
		backgroundColor: alternate_color,
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
		color: white,
		fontSize: 13,
	},
})