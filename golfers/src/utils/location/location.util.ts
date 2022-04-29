
import * as Location from 'expo-location';

export async function getCurrentLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        // console.log('not granted')
        return;
    } else {
        // console.log('granted')
    }

    let location = await Location.getCurrentPositionAsync({});
    return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
    };
}