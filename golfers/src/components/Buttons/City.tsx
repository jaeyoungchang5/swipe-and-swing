import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';

import { alternate_color, white, black } from '../../options.json';
import { reverseGeocode } from '../../utils';
import { getGolferInfo } from '../../middleware';

export function City({appUserId}: any) {
	const [city, setCity] = useState<string>('');

	useEffect(() => {
		getGolferInfo(appUserId, 0)
		.then(res => {
			reverseGeocode(Number(res.latitude), Number(res.longitude))
			.then((res: string) => {
				setCity(res);
			})
		})
	}, []);

    return (
        <TouchableOpacity style={styles.city}>
            <Entypo name="location-pin" size={20} color={white} />
            <Text style={styles.cityText}>
                {city}
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
		minWidth: '20%',
		shadowColor: black,
		shadowOffset: { height: 0, width: 0 },
	},
	cityText: {
		// fontFamily: ICON_FONT,
		color: white,
		fontSize: 13,
	},
})