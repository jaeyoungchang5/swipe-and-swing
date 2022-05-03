
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

export function reverseGeocode(latitude: number, longitude: number) {
    const apikey = 'MWZiYjU2ZjU2ZGJhNGMyNWJiYjI5NzE3NmMyY2QzODk6YmJiZmFhN2YtZGU1ZC00YWExLWI4NTktZjBhOGE3NWQ0NWI3';
    return fetch(`https://api.myptv.com/geocoding/v1/locations/by-position/${latitude}/${longitude}?apiKey=${apikey}`)
    .then(res => {
        return res.json()
    })
    .then(res => {
        if (res.locations[0].address) {
            // console.log(res.locations[0].address)
            return String(res.locations[0].address.city);
        } else {
            return 'South Bend';
        }
    })
    .catch(err => {
        return 'South Bend';
    })
}