// external imports
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

// internal imports

export function NotifsPage() {
    return (
        <View style={styles.container}>
            <Text>See your notifications!</Text>
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
