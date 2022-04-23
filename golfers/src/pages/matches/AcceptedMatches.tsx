// external imports
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, ScrollView, TouchableOpacity, ImageBackground, StyleSheet, Text, View, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SimpleLineIcons, MaterialCommunityIcons } from '@expo/vector-icons';

// internal imports
import { SwipeItem } from '../../components';
import {
    dark_grey
} from '../../options.json';
import { demoAcceptedMatches } from '../../demoData';
import { IMatch } from '../../interfaces';

export function AcceptedMatches({ navigation, setIndex }: any) {
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [acceptedMatches, setAcceptedMatches] = useState<IMatch[]>();

    useEffect(() => {
        setAcceptedMatches(demoAcceptedMatches);
    }, []);

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
                    <TouchableOpacity onPress={() => setIndex(0)}>
                        <Text style={styles.icon}>
                            <MaterialCommunityIcons name="gesture-swipe-right" size={26} color="black" />
                        </Text>
                    </TouchableOpacity>
                    <Text style={styles.title}>Accepted Matches</Text>
                </View>
                <FlatList
                    numColumns={2}
                    data={acceptedMatches}
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
                            onPress={() => navigation.push('Profile Screen', {golfer_id: item.golfer_id})}
                        >
                            <SwipeItem
                                image={item.image}
                                firstName={item.firstName}
                                lastName={item.lastName}
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
    pageHeader: {
        marginLeft: 20
    },
    pageHeaderText: {
        fontSize: 14,
        fontStyle: 'italic'
    }
});
