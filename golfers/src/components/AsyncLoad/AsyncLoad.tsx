// external imports
import React from 'react';
import { Dimensions, Image, StyleSheet, View} from 'react-native';

// internal imports

export function AsyncLoad() {
    
    const fullWidth = Dimensions.get('window').width;
    const imageStyle = [
        {
            borderRadius: 8,
            width: fullWidth/2,
            height: 325,
            margin: 20
        }
    ]

    return (
        <View style={styles.loading}>
            <Image style={imageStyle} source={require('../../../assets/thegolfer.gif')} />
        </View>
    )
}

const styles = StyleSheet.create({
    loading: {
        flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
    },
    lottie: {
        flex: 1
    }
});