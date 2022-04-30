// external imports
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { Modal } from 'native-base';
import * as Linking from 'expo-linking';

// internal imports
import { ICourse } from '../../interfaces';
import { CourseResult } from './CourseResult';
import { primary_color } from '../../options.json';

export function SearchCourses({courseResults, initialCoordinates} : any) {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [course, setCourse] = useState<ICourse>();

    useEffect(() => {

    }, []);

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={initialCoordinates}
                showsBuildings={true}
                loadingEnabled={true}
                showsUserLocation={true}
            >
                {courseResults && courseResults.map((marker: ICourse, index: number) => {
                    return (
                        <Marker
                            key={index}
                            coordinate={{
                                latitude: marker.latitude,
                                longitude: marker.longitude,
                            }}
                        >
                            <Callout>
                                <View>
                                    <Text>{marker.courseName}</Text>
                                    <Text></Text>
                                    
                                    <TouchableOpacity 
                                        onPress={() => {
                                            setShowModal(true);
                                            setCourse(marker);
                                        }} 
                                        style={styles.button}
                                    >
                                        <Text style={styles.buttonText}>See more</Text>
                                    </TouchableOpacity>
                                </View>
                            </Callout>
                        </Marker>
                    )
                })}
            </MapView>
            <View style={styles.list}>
                <FlatList
                    data={courseResults}
                    style={styles.results}
                    scrollEnabled={true}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <CourseResult courseResult={item} setShowModal={setShowModal} setCourse={setCourse} />
                    )}
                />
            </View>

            {course &&
                <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                    <Modal.Content>
                        <Modal.CloseButton />
                        <Modal.Header>{course.courseName}</Modal.Header>
                        <Modal.Body>
                            <Text>{course.courseDescription}</Text>
                        </Modal.Body>
                        <Modal.Footer>
                            <TouchableOpacity 
                                onPress={() => {
                                   Linking.openURL(`tel:+1${course.phoneNum}`)
                                }} 
                                style={styles.courseButton}
                            >
                                <Text style={styles.buttonText}>Call course</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity 
                                onPress={() => {
                                    Linking.openURL(course.website);
                                }} 
                                style={styles.courseButton}
                            >
                                <Text style={styles.buttonText}>Visit website</Text>
                            </TouchableOpacity>
                        </Modal.Footer>
                    </Modal.Content>
                </Modal>
            }
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
        flex: 2,
        borderRadius: 4,
        borderWidth: 0.5
    },
    button: {
        backgroundColor: primary_color,
        padding: 10,
        borderRadius: 10,
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 10,
        color: '#fff',
    },
    courseButton: {
        backgroundColor: primary_color,
        padding: 10,
        borderRadius: 10,
        marginLeft: 10,
    },
    list: {
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