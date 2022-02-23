// external imports
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

// internal imports

export function SearchPage() {
    return (
        <View style={styles.container}>
            <Text>Find golf courses near you!</Text>
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
