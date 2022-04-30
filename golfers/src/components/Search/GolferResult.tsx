// external imports
import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

// internal imports
import { primary_color, white } from '../../options.json';

export function GolferResult( { appUserId, golferResult, navigation } : any) {
    function handleRedirect() {
        navigation.push('Profile Search Screen', {golfer_id: golferResult.golfer_id, profileStatus: 2})
    }

    return (
        <TouchableOpacity style={styles.container} onPress={handleRedirect}>
            <View>
                <Text style={styles.name}>{golferResult.firstName} {golferResult.lastName} </Text>
                <Text style={styles.username}>@{golferResult.username}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: primary_color,
        padding: 5,
        margin: 5,
        borderRadius: 8,
    },
    name: {
        color: white
    },
    username: {
        fontStyle: 'italic',
        fontWeight: 'bold',
        color: white
    }
});