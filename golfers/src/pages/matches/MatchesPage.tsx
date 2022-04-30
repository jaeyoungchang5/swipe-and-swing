// external imports
import React, { useState } from 'react';
import { ImageBackground, StyleSheet, View, TouchableOpacity } from 'react-native';
import { TabView } from 'react-native-tab-view';
import { AntDesign } from '@expo/vector-icons';

// internal imports
import { AcceptedMatches } from './AcceptedMatches';
import { PendingMatches } from './PendingMatches';
import { grey } from '../../options.json';

export function MatchesPage({ route, navigation }: any) {
    const appUserId: number = route.params.appUserId;

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'pending', title: 'Pending' },
        { key: 'accepted', title: 'Accepted' },
    ]);

    function renderScene({ route }: any) {
        switch(route.key) {
            case 'pending':
                return <PendingMatches appUserId={appUserId} navigation={navigation} setIndex={setIndex} />;
            case 'accepted':
                return <AcceptedMatches appUserId={appUserId} navigation={navigation} setIndex={setIndex} />;
        }
    }

    return (
        <ImageBackground
            source={require('../../../assets/bg.png')}
            style={styles.bg}
        >
            <View style={styles.container}>
                <TabView
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    tabBarPosition='bottom'
                    renderTabBar={() => null}
                />
                <View style={styles.tab}>
                    <View style={styles.tab_indicator}>
                        <TouchableOpacity onPress={() => setIndex(0)}>
                            <AntDesign name="question" size={25} color={index == 0 ? "white" : "black"} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setIndex(1)}>
                            <AntDesign name="check" size={25} color={index == 1 ? "white" : "black"} />
                        </TouchableOpacity>
                    </View>
                </View>
                
        
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
    },
    tab: {
        backgroundColor: grey,
        opacity: 0.4,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 20,
        borderRadius: 25,
    },
    tab_indicator: {
        flexDirection: "row",
        width: 60,
        justifyContent: 'space-between',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 3,
        marginBottom: 3,
    }
});
