// external imports
import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { AsyncLoad } from '../AsyncLoad';

// internal imports
import { GolferResult } from './GolferResult';

export function SearchGolfers({ appUserId, golferResults, navigation } : any) {

    useEffect(() => {

    }, []);

    return (
        // <ScrollView style={styles.container}>
        // <SafeAreaView style={styles.bg}>
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
        // </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    bg: {
        flex: 1,
    },
	container: {
		flex: 1,
        backgroundColor: 'white',
        borderRadius: 4,
        marginTop: 10,
	},
    results: {
        flex: 1,
    },
});