// external imports
import React, { useEffect, useState } from 'react';
import { ScrollView, FlatList, TouchableOpacity, StyleSheet, Text, View, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// internal imports
import { AsyncLoad, SwipeItem } from '../../components';
import { dark_grey } from '../../options.json';
import { IMatch } from '../../interfaces';
import { getPotentialMatches } from '../../middleware';

export function PendingMatches({ appUserId, navigation, setIndex }: any) {
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [pendingMatches, setpendingMatches] = useState<IMatch[]>();

    useEffect(() => {
        loadPendingMatches();
    }, []);

    function loadPendingMatches() {
        getPotentialMatches(appUserId)
        .then(res => {
            if (res) setpendingMatches(res);
            else setpendingMatches(undefined);
        })
    }

    function onRefresh() {
		setRefreshing(true);
		setTimeout(() => {
			// call api to laod matches
            loadPendingMatches();
			setRefreshing(false);
		}, 700)
	}

    return (
            <SafeAreaView style={styles.container}>
            <View style={styles.containerMatches}>
                <View style={styles.top}>
                    <Text style={styles.title}>Pending Matches</Text>
                    <TouchableOpacity onPress={() => setIndex(1)}>
                        <Text style={styles.icon}>
                            <MaterialCommunityIcons name="gesture-swipe-left" size={26} color="black" />
                        </Text>
                    </TouchableOpacity>
                </View>
                {pendingMatches ? 
                    <FlatList
                        numColumns={2}
                        data={pendingMatches}
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
        backgroundColor: 'white'
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
