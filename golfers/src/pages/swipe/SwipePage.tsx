// external imports
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

// internal imports

export function SwipePage() {
    return (
        <View style={styles.container}>
            <Text>Swipe and find your swinging match!</Text>
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
