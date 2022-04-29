// external imports
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { Modal } from 'native-base';
import * as Location from 'expo-location';
import * as Linking from 'expo-linking';
import { useIsFocused } from '@react-navigation/native';

// internal imports
import { demoCourses } from '../../demoData';
import { ICourse, IInitialCoordinates, ICoordinates } from '../../interfaces';
import { AsyncLoad } from '../AsyncLoad/';
import { getCurrentLocation } from '../../utils';

export function SearchCourses({searchText, searchTrig, updateSearchTrig, initialCoordinates} : any) {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [course, setCourse] = useState<ICourse>();
    const [userlocation, setUserLocation] = useState<ICoordinates>();
    const [courses, setCourses] = useState<ICourse[]>();
	const [errorMsg, setErrorMsg] = useState<string>();
    
    const isFocused = useIsFocused();

    

    useEffect(() => {
        let mounted = true;
        if (isFocused) {
            if (searchTrig) {
                console.log(`searching courses for: ${searchText}`)
                updateSearchTrig(false);
            }
        }
        // get users prev location=

        // get all courses
        setCourses(demoCourses);
        getCurrentLocation()
        .then(res => {
            if (mounted) {
                setUserLocation(res);
            }
        })
        

        return function cleanup() {
            mounted = false;
        };
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
                {courses && courses.map((marker, index) => {
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
                                <Text style={styles.buttonText}>Call</Text>
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
    },
    courseButton: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 10,
        marginLeft: 10,
    }
});