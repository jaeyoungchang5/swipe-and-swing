// external imports
import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

// internal imports
import { primary_color, white } from '../../options.json';

export function TeeTimeResult( { teeTimeResult, setShowModal, setTeeTime } : any) {

    return (
        <TouchableOpacity style={styles.container} onPress={() => {
            setShowModal(true);
            setTeeTime(teeTimeResult);
        }}>
            <View>
                <Text style={styles.name}>{teeTimeResult.date} {teeTimeResult.time}</Text>
                <Text style={styles.username}>@{teeTimeResult.courseName}</Text>
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