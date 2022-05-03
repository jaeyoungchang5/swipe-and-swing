import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { white, alternate_color, black } from '../../options.json';

export function UploadButton({ appUserId, navigation }: any) {

    return (
        <TouchableOpacity onPress={() => navigation.push('Upload Screen', {appUserId: appUserId})} style={styles.upload}>
            <AntDesign name="pluscircle" size={20} color={white} />
			<Text style={styles.uploadText}>
				Post
			</Text>
		</TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    upload: {
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
    uploadText: {
        color: white,
		fontSize: 13
    }
})