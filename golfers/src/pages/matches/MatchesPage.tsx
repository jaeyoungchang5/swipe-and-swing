// external imports
import React, { useEffect, useRef, useState } from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';

// internal imports

export function MatchesPage() {
    return (
        <View style={styles.container}>
            <Text>Matches page</Text>
        </View>
    );
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
