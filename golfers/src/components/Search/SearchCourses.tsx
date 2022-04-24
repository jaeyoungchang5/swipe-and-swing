// external imports
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';

// internal imports
import { demoCourses } from '../../demoData';
import { ICourse } from '../../interfaces';
import {
    dark_grey,
	grey,
	primary_color,
	alternate_color,
	white,
	like_actions,
	dislike_actions
} from '../../options.json';

export function SearchCourses() {

    const [courses, setCourses] = useState<ICourse[]>();

    useEffect(() => {
        setCourses(demoCourses);
    }, []);

    /* initial coordinates that map will be centered on */
    const initialCoordinates = {
        latitude: 41.7030,
        longitude: -86.2390,
        latitudeDelta: 0.03,
        longitudeDelta: 0.01,
    }

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={initialCoordinates}
                showsBuildings={true}
                loadingEnabled={true}
                showsUserLocation={true}
            >
                {courses && courses.map((marker, index) => {
                    return (
                        <Marker
                            key={index}
                            coordinate={{
                                latitude: marker.latitude,
                                longitude: marker.longitude,
                            }}
                            // pinColor={alternate_color}
                        >
                            <Callout>
                                <View>
                                    <Text>{marker.courseName}</Text>
                                    <Text></Text>
                                    <TouchableOpacity style={styles.button}>
                                        <Text style={styles.buttonText}>See more</Text>
                                    </TouchableOpacity>
                                </View>
                            </Callout>
                        </Marker>
                    )
                })}
            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
        borderRadius: 4,
        marginTop: 10,
	},
    map: {
        flex: 1,
        borderRadius: 4,
        borderWidth: 0.5
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 10,
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 10,
        color: '#fff',
    }
});