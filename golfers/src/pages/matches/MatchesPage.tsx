// external imports
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, ScrollView, TouchableOpacity, ImageBackground, StyleSheet, Text, View, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SimpleLineIcons } from '@expo/vector-icons';

// internal imports
import { SwipeItem } from '../../components';
import {
    dark_grey
} from '../../options.json';
import { NavigationContainer } from '@react-navigation/native';

const demoData = [
	{
        _id: 1,
        firstName: "Andy",
        lastName: "Rocks",
        age: 22,
        image: require('../../../assets/Andy.jpg'),
        handicap: 19,
        defaultFormality: 'casual',
        defaultCarting: true,
        defaultDrinking: true,
        defaultNumHoles: 18,
        defaultNumPeople: 4,
        status: 0,
        match: 88
    },
    {
        _id: 2,
        firstName: "Timmy",
        lastName: "Gallagher",
        age: 21,
        image: require('../../../assets/Timmy.jpg'),
        handicap: 20,
        defaultFormality: 'casual',
        defaultCarting: false,
        defaultDrinking: false,
        defaultNumHoles: 9,
        defaultNumPeople: 2,
        status: 0,
        match: 70
    },
    {
        _id: 3,
        firstName: "JaeYoung",
        lastName: "Chang",
        age: 21,
        image: require('../../../assets/Jae.png'),
        handicap: 21,
        defaultFormality: 'casual',
        defaultCarting: false,
        defaultDrinking: true,
        defaultNumHoles: 9,
        defaultNumPeople: 4,
        status: 0,
        match: 90
    },
];

export function MatchesPage({ navigation }: any) {
    const [refreshing, setRefreshing] = useState<boolean>(false);
    function onRefresh() {
		setRefreshing(true);
		setTimeout(() => {
			// call api to laod matches
			setRefreshing(false);
		}, 700)
	}
    return (
        <ImageBackground
            source={require('../../../assets/bg.png')}
            style={styles.bg}
        >
            <SafeAreaView style={styles.container}>
            <View style={styles.containerMatches}>
                <View style={styles.top}>
                    <Text style={styles.title}>Matches</Text>
                    <TouchableOpacity>
                        <Text style={styles.icon}>
                            <SimpleLineIcons name="options-vertical" size={15} color="black" />
                        </Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    numColumns={2}
                    data={demoData}
                    keyExtractor={(item, index) => index.toString()}
                    refreshing={refreshing}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => navigation.push('Profile Screen', {_id: item._id})}
                        >
                            <SwipeItem
                                image={item.image}
                                name={item.firstName}
                                actions={false}
                                variant={true}
                            />
                        </TouchableOpacity>
                    )}
                />
            </View>
            </SafeAreaView>
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
		flex: 1
	},
    // CONTAINER - MATCHES
	containerMatches: {
		justifyContent: "space-between",
		flex: 1,
		paddingHorizontal: 10
	},
    top: {
		paddingTop: 10,
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
