// external imports
import React, { useEffect, useState } from 'react';
import { StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';

// internal imports

export function AsyncLoad() {
    return (
        <LottieView
            source={require('../../assets/hole-in-one.json')}
            style={styles.lottie}
            autoPlay 
            loop
        />
    )
}

const styles = StyleSheet.create({
    lottie: {
        flex: 1
    }
});