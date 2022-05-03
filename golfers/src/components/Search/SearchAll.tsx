// external imports
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export function SearchAll({searchText, searchTrig, updateSearchTrig, searchFilter} : any) {

    useEffect(() => {
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