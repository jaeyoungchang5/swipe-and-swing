// external imports
import React, { useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

// internal imports
import { GolferResult } from './GolferResult';

export function SearchGolfers({ appUserId, golferResults, navigation } : any) {

    useEffect(() => {

    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                numColumns={2}
                data={golferResults}
                style={styles.results}
                scrollEnabled={true}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <GolferResult appUserId={appUserId} golferResult={item} navigation={navigation} />
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
        backgroundColor: 'white',
        borderRadius: 4,
        marginTop: 10,
        borderWidth: 0.5,
	},
    results: {
        flex: 1,
    },
});