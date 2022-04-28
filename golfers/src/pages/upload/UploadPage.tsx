// external imports
import React, { useEffect, useRef, useState } from 'react';
import { ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AntDesign, MaterialIcons, SimpleLineIcons, Entypo, Ionicons } from '@expo/vector-icons';
import { Input, Select, Switch } from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRoute } from '@react-navigation/native';

// internal imports
import { Upload } from '../../components';
import {
    dark_grey,
	primary_color,
	alternate_color,
	white,
	like_actions,
	dislike_actions
} from '../../options.json';
import { demoPostDefaults } from '../../demoData';
import { IDefaults, INewPostDefault } from '../../interfaces';

export function UploadPage({navigation}: any) {
    const [options, setOptions] = useState<INewPostDefault>({
        handicap: '',
        carting: false,
        walking: false,
        isDrinking: false,
        isBetting: false,
        isMusic: false,
        numPeople: '',
        numHoles: '',
        duration: '',
    });

    const route = useRoute();
	const [service, setService] = useState<string>();

    function handleRoutingBack() {
		navigation.navigate('Swipe Screen');
	}

    function configureDefaults() {
        // get request
        let data = demoPostDefaults;
        setOptions((prev:INewPostDefault) => { return {
            ...prev,
            handicap: data.handicap.toString(),
            carting: data.transport == 'Carting' ? true : false,
            walking: data.transport == 'Walking' ? true : false,
            isDrinking: data.isDrinking,
            isBetting: data.isBetting,
            isMusic: data.isMusic,
            numPeople: data.numPeople.toString(),
            numHoles: data.numHoles.toString(),
            duration: ''
        }});
    }

    useEffect(() => {
        configureDefaults();
    }, []);

    function handleUpload() {
        console.log(options);
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.top}>
                {route.name == 'Upload' ? 
                    <TouchableOpacity onPress={configureDefaults}>
                        <Text style={styles.icon}>
                            <Ionicons name="md-refresh" size={24} color="black" />
                        </Text>
                    </TouchableOpacity>
                :
                    <TouchableOpacity onPress={handleRoutingBack}>
                        <Text style={styles.icon}>
                            <Ionicons name="arrow-back" size={24} color="black" />
                        </Text>
                    </TouchableOpacity>
                }
                
                <Text style={styles.title}>New Post</Text>

                {route.name == 'Upload' ? 
                    
                    <Select onValueChange={(value) => setService(value)} borderWidth={0} dropdownIcon={<Ionicons name="ios-settings" size={24} color="black" />}>
                        <Select.Item label='Reset to defaults' value='reset' />
                        <Select.Item label='Change defaults' value='change' />
                        <Select.Item label='View old posts' value='history' />
                    </Select>
                :
                    <TouchableOpacity onPress={configureDefaults}>
                        <Text style={styles.icon}>
                            <Ionicons name="md-refresh" size={24} color="black" />
                        </Text>
                    </TouchableOpacity>
                }
            </View>
            <Upload options={options} setOptions={setOptions} />

            <View style={styles.actionsProfile}>
                <TouchableOpacity onPress={handleUpload} style={styles.logoutButton}>
                    <Text style={styles.iconButton}>
                        <AntDesign name="upload" size={20} color="white" />
                    </Text>
                    <Text style={styles.textButton}>Upload</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
	// CONTAINER - GENERAL
	container: {
		flex: 1,
	},
    title: { paddingBottom: 10, fontSize: 22, color: dark_grey },
    top: {
		paddingTop: 10,
		paddingHorizontal: 10,
		marginHorizontal: 10,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center"
	},
    icon: {
		fontSize: 20,
		color: dark_grey,
		paddingRight: 10
	},
	actionsProfile: {
		justifyContent: "center",
		flexDirection: "row",
		alignItems: "center"
	},
	iconButton: { fontSize: 20, color: white },
	textButton: {
		fontSize: 15,
		color: white,
		paddingLeft: 10
	},
	logoutButton: {
		justifyContent: "center",
		flexDirection: "row",
		alignItems: "center",
		marginLeft: 10,
		height: 50,
		borderRadius: 25,
		backgroundColor: primary_color,
		paddingHorizontal: 20,
        marginBottom: 20
	},
});
