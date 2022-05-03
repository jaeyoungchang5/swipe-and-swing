// external imports
import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, StyleSheet, Text, View, RefreshControl, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {  MaterialCommunityIcons } from '@expo/vector-icons';

// internal imports
import { AsyncLoad, SwipeItem } from '../../components';
import { white, dark_grey } from '../../options.json';
import { IMatch } from '../../interfaces';
import { getAcceptedMatches } from '../../middleware';

export function AcceptedMatches({ appUserId, navigation, setIndex }: any) {
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [acceptedMatches, setAcceptedMatches] = useState<IMatch[]>();

    useEffect(() => {
        loadAcceptedMatches();
    }, []);

    function loadAcceptedMatches() {
        getAcceptedMatches(appUserId)
        .then(res => {
            if (res) setAcceptedMatches(res);
            else setAcceptedMatches(undefined);
        })
    }

    function onRefresh() {
		setRefreshing(true);
		setTimeout(() => {
			// call api to laod matches
            loadAcceptedMatches();
			setRefreshing(false);
		}, 700)
	}

    return (
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
                {acceptedMatches ?
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
                                onPress={() => navigation.push('Profile Screen', {appUserId: appUserId, match: item})}
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
                :
                    <ScrollView
                        style={styles.scroll}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                    >
                        <AsyncLoad />
                    </ScrollView>
                }
            </View>
            </SafeAreaView>
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
        backgroundColor: white
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
    scroll: {
        flex: 1
    }
});
