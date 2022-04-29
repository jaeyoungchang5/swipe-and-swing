// external imports
import React, { useEffect, useState } from 'react';
import { StyleSheet, View} from 'react-native';
import LottieView from 'lottie-react-native';

// internal imports

export function AsyncLoad() {
    useEffect(() => {
        
    }, []);
    return (
        <View style={styles.loading}>
            <LottieView
                source={require('./golfer-swing.json')}
                style={styles.lottie}
                autoPlay 
                loop
            />
        </View>
    )
}

const styles = StyleSheet.create({
    loading: {
        // flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		// backgroundColor: 'red',
		height: '100%'
    },
    lottie: {
        flex: 1
    }
});