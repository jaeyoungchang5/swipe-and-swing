import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { white, alternate_color, black, dark_grey } from '../../options.json';

export function Filters() {
	return (
		<TouchableOpacity style={styles.filters}>
			<FontAwesome name="filter" size={20} color={white} />
			<Text style={styles.filtersText}>
				Filters
			</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
    // COMPONENT - FILTERS
	filters: {
		backgroundColor: alternate_color,
		alignItems: "center",
		justifyContent: "space-between",
		flexDirection: "row",
		paddingTop: 10,
		paddingBottom: 10,
		paddingRight: 15,
		paddingLeft: 15,
		borderRadius: 20,
		width: "25%",
		shadowOpacity: 0.05,
		shadowRadius: 10,
		shadowColor: black,
		shadowOffset: { height: 0, width: 0 }
	},
	filtersText: {
		// fontFamily: icon_font,
		color: white,
		fontSize: 13
	},
})