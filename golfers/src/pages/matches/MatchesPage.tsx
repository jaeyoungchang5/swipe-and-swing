// external imports
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, ScrollView, TouchableOpacity, ImageBackground, StyleSheet, Text, View } from 'react-native';

// internal imports
import { SwipeItem } from '../../components';
import {
    dark_grey
} from '../../options.json';

const demoData = [
	{
		id: 1,
		name: 'Andy Rocks',
		caption: 'What is up',
		status: 'Online',
		match: '78',
		handicap: 19,
		transport: 'Carting',
		isDrinking: true,
		isBetting: true,
		num_holes: 18,
		num_people: 4,
		distance: 1.4,
		isMusic: true,
		image: require('../../../assets/Andy.jpg')
	},
	{
		id: 2,
		name: 'Timmy Gallagher',
		caption: 'Frick bro',
		status: 'Online',
		match: '98',
		handicap: 20,
		transport: 'Walking',
		isDrinking: false,
		isBetting: false,
		num_holes: 9,
		num_people: 2,
		distance: 3.1,
		isMusic: false,
		image: require('../../../assets/Timmy.jpg')
	},
	{
		id: 3,
		name: 'JaeYoung Chang',
		caption: 'Sup yo',
		status: 'Online',
		match: '80',
		handicap: 21,
		transport: 'Walking',
		isDrinking: true,
		isBetting: false,
		num_holes: 9,
		num_people: 4,
		distance: 3.1,
		isMusic: false,
		image: require('../../../assets/Jae.png')
	}
];

export function MatchesPage() {
    return (
        <ImageBackground
            source={require('../../../assets/bg.png')}
            style={styles.bg}
        >
            <View style={styles.containerMatches}>
                <FlatList
                    numColumns={2}
                    data={demoData}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity>
                            <SwipeItem
                                image={item.image}
                                name={item.name}
                                actions={false}
                                variant={true}
                            />
                        </TouchableOpacity>
                    )}
                />
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
	// CONTAINER - GENERAL
	bg: {
		flex: 1,
		resizeMode: "cover"
	},
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
    // CONTAINER - MATCHES
	containerMatches: {
		justifyContent: "space-between",
		flex: 1,
		paddingHorizontal: 10
	},
    top: {
		paddingTop: 50,
		marginHorizontal: 10,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center"
	},
    title: { paddingBottom: 10, fontSize: 22, color: dark_grey },
    icon: {
		fontSize: 20,
		color: dark_grey,
		paddingRight: 10
	},
});
