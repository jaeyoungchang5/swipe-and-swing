// external imports
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

export function SearchAll({searchText, searchTrig, updateSearchTrig} : any) {
    const isFocused = useIsFocused();

    

    useEffect(() => {
        if (isFocused) {
            if (searchTrig) {
                console.log(`searching all for: ${searchText}`)
                updateSearchTrig(false);
            }
        }
    }, []);

    return (
        <View style={styles.container}>
            <Text>Search All</Text>
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