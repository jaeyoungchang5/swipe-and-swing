// external imports
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

// internal imports

export function ProfilePage() {
    return (
        <View style={styles.container}>
            <Text>View and edit your profile page!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
