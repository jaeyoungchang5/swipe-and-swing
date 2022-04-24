// external imports
import React, { useEffect, useRef, useState } from 'react';
import { ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AntDesign, MaterialIcons, SimpleLineIcons, Entypo, Ionicons } from '@expo/vector-icons';
import { Input, Select, Switch } from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';

// internal imports
import {
    dark_grey,
	primary_color,
	alternate_color,
	white,
	like_actions,
	dislike_actions
} from '../../options.json';

export function UploadPage({navigation}: any) {
    
    const [handicap, setHandicap] = useState<string>();
    const [carting, setCarting] = useState<boolean>(false);
    const [walking, setWalking] = useState<boolean>(false);
    const [isDrinking, setIsDrinking] = useState<boolean>(false);
    const [isBetting, setIsBetting] = useState<boolean>(false);
    const [isMusic, setIsMusic] = useState<boolean>(false);
    const [numPeople, setNumPeople] = useState<string>();
    const [numHoles, setNumHoles] = useState<string>();
    const [date, setDate] = useState();

    function handleRoutingBack() {
		navigation.navigate('Swipe Screen');
	}

    useEffect(() => {
        setHandicap('20');
        setCarting(true);
        setIsDrinking(true);
        setIsBetting(false);
        setIsMusic(false);
        setNumPeople('4');
        setNumHoles('18');
    }, []);

    function handleUpload() {
        let upload = {
            handicap: handicap,
            transport: carting ? 'Carting' : 'Walking',
            isDrinking: isDrinking,
            isBetting: isBetting,
            isMusic: isMusic,
            numPeople: numPeople,
            numHoles: numHoles
        };
        console.log(upload);
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.top}>
                <TouchableOpacity onPress={handleRoutingBack}>
                    <Text style={styles.icon}>
                        <Ionicons name="arrow-back" size={24} color="black" />
                    </Text>
                </TouchableOpacity>
                <Text style={styles.title}>Upload</Text>
                <TouchableOpacity>
                    <Text style={styles.icon}>
                        <SimpleLineIcons name="options-vertical" size={15} color="black" />
                    </Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.scroll}>
                <View style={styles.options}>
                    <View style={styles.optionItem}>
                        <Text>Handicap</Text>
                        <Input borderColor={primary_color} borderWidth={1.5} value={handicap} onChangeText={(text) => setHandicap(text)} width={"35%"} keyboardType='number-pad' variant="rounded" placeholder="H'Cap" />
                    </View>
                    <View style={styles.optionItem}>
                        <Text>Carting</Text>
                        <Switch isChecked={carting} value={carting} onValueChange={(value) => {
                            if (value == true && walking == true) {
                                setWalking(false);
                            }
                            setCarting(value);
                        }} trackColor={{true: primary_color}} />
                    </View>
                    <View style={styles.optionItem}>
                        <Text>Walking</Text>
                        <Switch isChecked={walking} value={walking} onValueChange={(value) => {
                            if (value == true && carting == true) {
                                setCarting(false);
                            }
                            setWalking(value);
                        }} trackColor={{true: primary_color}} />
                    </View>
                    <View style={styles.optionItem}>
                        <Text>Drinking</Text>
                        <Switch isChecked={isDrinking} value={isDrinking} onValueChange={(value) => setIsDrinking(value)} trackColor={{true: primary_color}} />
                    </View>
                    <View style={styles.optionItem}>
                        <Text>Betting</Text>
                        <Switch isChecked={isBetting} value={isBetting} onValueChange={(value) => setIsBetting(value)} trackColor={{true: primary_color}} />
                    </View>
                    <View style={styles.optionItem}>
                        <Text>Music</Text>
                        <Switch isChecked={isMusic} value={isMusic} onValueChange={(value) => setIsMusic(value)} trackColor={{true: primary_color}} />
                    </View>
                    <View style={styles.optionItem}>
                        <Text># People</Text>
                        <Input borderColor={primary_color} borderWidth={1.5} value={numPeople} onChangeText={(text) => setNumPeople(text)} width={"35%"} keyboardType='number-pad' variant="rounded" placeholder="People" />
                    </View>
                    <View style={styles.optionItem}>
                        <Text># Holes</Text>
                        <Input borderColor={primary_color} borderWidth={1.5} /* bgColor={primary_color} */ value={numHoles} onChangeText={(text) => setNumHoles(text)} width={"35%"} keyboardType='number-pad' variant="rounded" placeholder="Holes" />
                    </View>
                </View>
                <View style={styles.actionsProfile}>
                    <TouchableOpacity onPress={handleUpload} style={styles.logoutButton}>
                        <Text style={styles.iconButton}>
                            <AntDesign name="upload" size={20} color="white" />
                        </Text>
                        <Text style={styles.textButton}>Upload</Text>
                    </TouchableOpacity>
                </View>
                {/* <DateTimePicker
                    value={new Date()}
                    display='default'
                /> */}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
	// CONTAINER - GENERAL
	bg: {
		flex: 1,
		resizeMode: "cover"
	},
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
        marginBottom: 10
	},
	topIconLeft: {
		fontSize: 20,
		paddingLeft: 20,
		marginTop: -20
	},
    scroll: {
    },
    options: {
        // backgroundColor: "red",
        width: "40%",
        margin: 20,
        marginLeft: "auto",
        marginRight: "auto"
    },
    optionItem: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: "space-between",
        margin: 10,
    }
});
