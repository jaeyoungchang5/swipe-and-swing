// external imports
import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Input, Switch } from 'native-base';

// internal imports
import { primary_color } from '../options.json';
import { IDefaults } from '../interfaces';

export function Upload({options, setOptions}: any) {

    useEffect(() => {

    }, []);

    return (

        <ScrollView style={styles.scroll}>
            <View style={styles.options}>
                <View style={styles.optionItem}>
                    <Text>Carting</Text>
                    <Switch isChecked={options.carting} value={options.carting} onValueChange={(value) => {
                        if (value == true && options.walking == true) {
                            setOptions((prev: IDefaults) => {return {...prev, 'walking': false}});
                        }
                        setOptions((prev: IDefaults) => {return {...prev, 'carting': value}});
                    }} trackColor={{true: primary_color}} />
                </View>
                <View style={styles.optionItem}>
                    <Text>Walking</Text>
                    <Switch isChecked={options.walking} value={options.walking} onValueChange={(value) => {
                        if (value == true && options.carting == true) {
                            setOptions((prev: IDefaults) => {return {...prev, 'carting': false}});
                        }
                        setOptions((prev: IDefaults) => {return {...prev, 'walking': value}});
                    }} trackColor={{true: primary_color}} />
                </View>
                <View style={styles.optionItem}>
                    <Text>Drinking</Text>
                    <Switch isChecked={options.isDrinking} value={options.isDrinking} onValueChange={(value) => setOptions((prev: IDefaults) => {return {...prev, 'isDrinking': value}})} trackColor={{true: primary_color}} />
                </View>
                <View style={styles.optionItem}>
                    <Text>Betting</Text>
                    <Switch isChecked={options.isBetting} value={options.isBetting} onValueChange={(value) => setOptions((prev: IDefaults) => {return {...prev, 'isBetting': value}})} trackColor={{true: primary_color}} />
                </View>
                <View style={styles.optionItem}>
                    <Text>Music</Text>
                    <Switch isChecked={options.isMusic} value={options.isMusic} onValueChange={(value) => setOptions((prev: IDefaults) => {return {...prev, 'isMusic': value}})} trackColor={{true: primary_color}} />
                </View>
                <View style={styles.optionItem}>
                    <Text># People</Text>
                    <Input borderColor={primary_color} borderWidth={1.5} value={options.numPeople} onChangeText={(value) => setOptions((prev: IDefaults) => {return {...prev, 'numPeople': value}})} width={"35%"} keyboardType='number-pad' variant="rounded" placeholder="People" />
                </View>
                <View style={styles.optionItem}>
                    <Text># Holes</Text>
                    <Input borderColor={primary_color} borderWidth={1.5} /* bgColor={primary_color} */ value={options.numHoles} onChangeText={(value) => setOptions((prev: IDefaults) => {return {...prev, 'numHoles': value}})} width={"35%"} keyboardType='number-pad' variant="rounded" placeholder="Holes" />
                </View>
                <View style={styles.optionItem}>
                    <Text>Delete in</Text>
                    <Input borderColor={primary_color} borderWidth={1.5} /* bgColor={primary_color} */value={options.duration} onChangeText={(value) => setOptions((prev: IDefaults) => {return {...prev, 'duration': value}})} width={"25%"} keyboardType='number-pad' variant="rounded" placeholder="#" />
                    <Text>days</Text>
                </View>
            </View>
            
        </ScrollView>
    )
}

const styles = StyleSheet.create({
	// CONTAINER - GENERAL
    scroll: {
    },
    options: {
        // backgroundColor: "red",
        width: "40%",
        margin: 20,
        marginLeft: "auto",
        marginRight: "auto"
    },
    optionItem: {
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: "space-between",
        margin: 10,
    }
});
