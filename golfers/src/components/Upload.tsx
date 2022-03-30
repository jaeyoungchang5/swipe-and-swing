import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { white, black, dark_grey } from '../options.json';

export function Upload() {
    return (
        <TouchableOpacity style={styles.upload}>
            <AntDesign name="pluscircle" size={20} color="black" />
			<Text style={styles.uploadText}>
				Post
			</Text>
		</TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    upload: {
        backgroundColor: white,
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
    uploadText: {
        color: dark_grey,
		fontSize: 13
    }
})