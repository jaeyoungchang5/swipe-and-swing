// external imports
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { Modal } from 'native-base';
import * as Location from 'expo-location';
import * as Linking from 'expo-linking';

// internal imports
import { demoCourses } from '../../demoData';
import { ICourse } from '../../interfaces';
import { AsyncLoad } from '../AsyncLoad';

export function SearchCourses() {
    /* initial coordinates that map will be centered on */
    // const initialCoordinates = {
    //     latitude: 41.7030,
    //     longitude: -86.2390,
    //     latitudeDelta: 0.06,
    //     longitudeDelta: 0.06
    // }
    
    const [showModal, setShowModal] = useState<boolean>(false);
    const [course, setCourse] = useState<ICourse>();
    const [initialCoordinates, setInitialCoordinates] = useState<any>();
    const [userlocation, setUserLocation] = useState<any>(initialCoordinates);
    const [courses, setCourses] = useState<ICourse[]>();
	const [errorMsg, setErrorMsg] = useState<string>();

    async function getCurrentLocation() {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            // console.log('not granted')
            return;
        } else {
            // console.log('granted')
        }

        let location = await Location.getCurrentPositionAsync({});
        setUserLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
        });
        setInitialCoordinates({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.06,
            longitudeDelta: 0.06
        })
    }

    function seeMore(website: string) {
        Linking.openURL(website);
    }

    useEffect(() => {
        // get all courses
        setCourses(demoCourses);
        getCurrentLocation();
    }, []);

    return (
        <View style={styles.container}>
            {initialCoordinates ?
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
            :
                <AsyncLoad />
            }

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