// external imports
import React, { useEffect, useState } from 'react';
import { Text, FlatList, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Modal } from 'native-base';
import * as Linking from 'expo-linking';

// internal imports
import { ITeeTime } from '../../interfaces';
import { TeeTimeResult } from './TeeTimeResult';
import { primary_color } from '../../options.json';

export function SearchTeeTimes({ teeTimeResults } : any) {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [teeTime, setTeeTime] = useState<ITeeTime>();

    useEffect(() => {

    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={teeTimeResults}
                style={styles.results}
                scrollEnabled={true}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <TeeTimeResult teeTimeResult={item} setShowModal={setShowModal} setTeeTime={setTeeTime} />
                )}
            />
            {teeTime &&
                <Modal size={'xl'} isOpen={showModal} onClose={() => setShowModal(false)}>
                    <Modal.Content>
                        <Modal.CloseButton />
                        <Modal.Header>
                            {`${teeTime.time}\n@ ${teeTime.courseName}`}
                        </Modal.Header>
                        <Modal.Body>
                            <Text>{teeTime.courseDescription}</Text>
                        </Modal.Body>
                        <Modal.Footer>
                            <TouchableOpacity 
                                onPress={() => {
                                   
                                }} 
                                style={styles.courseButton}
                            >
                                <Text style={styles.buttonText}>Request tee time</Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                onPress={() => {
                                   Linking.openURL(`tel:+1${teeTime.coursePhoneNum}`)
                                }} 
                                style={styles.courseButton}
                            >
                                <Text style={styles.buttonText}>Call course</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity 
                                onPress={() => {
                                    Linking.openURL(teeTime.courseWebsite);
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
        backgroundColor: 'white',
        borderRadius: 4,
        marginTop: 10,
        borderWidth: 0.5,
	},
    results: {
        flex: 1,
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
});