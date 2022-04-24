// external imports
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

export function SearchGolfers() {
    return (
        <View style={styles.container}>
            <Text>Search Golfers</Text>
        </View>
    )
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
        backgroundColor: 'white',
        borderRadius: 4,
        padding: 10,
        marginTop: 10,
	}
});