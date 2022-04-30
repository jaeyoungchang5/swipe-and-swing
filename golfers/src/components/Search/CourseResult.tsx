// external imports
import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

// internal imports
import { primary_color, white } from '../../options.json';

export function CourseResult( { courseResult, setShowModal, setCourse } : any) {

    return (
        <TouchableOpacity style={styles.container} onPress={() => {
            setShowModal(true);
            setCourse(courseResult);
        }}>
            <View>
                <Text style={styles.courseName}>{courseResult.courseName}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: primary_color,
        padding: 5,
        marginTop: 5,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 1,
        borderRadius: 8,
    },
    courseName: {
        fontStyle: 'italic',
        fontWeight: 'bold',
        color: white
    }
});