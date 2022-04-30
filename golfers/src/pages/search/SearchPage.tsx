// external imports
import React, { useEffect, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { Input } from 'native-base';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ButtonToggleGroup from 'react-native-button-toggle-group';

// internal imports
import { SearchAll, SearchCourses, SearchGolfers, SearchTeeTimes } from '../../components';
import { getCurrentLocation } from '../../utils';
import { ICourse, IInitialCoordinates, ICoordinates } from '../../interfaces';
import { primary_color, white } from '../../options.json';

export function SearchPage() {
	const [focused, setFocused] = useState<boolean>(false);
	const [searchText, setSearchText] = useState<string>('');
	const [searchTrig, setSearchTrig] = useState<boolean>(false);
	const [searchFilter, setSearchFilter] = useState<string>('All');
    const [initialCoordinates, setInitialCoordinates] = useState<IInitialCoordinates>();

	const SearchOptionTab = createMaterialTopTabNavigator();

	useEffect(() => {
		getLastLocation();
	}, []);

	function getLastLocation() {
        // get user's last coordinates
        let lastCoordinates = {
            latitude: 41.7030,
            longitude: -86.2390,
        }
        setInitialCoordinates({
            latitude: lastCoordinates.latitude,
            longitude: lastCoordinates.longitude,
            latitudeDelta: 0.06,
            longitudeDelta: 0.06
        })
    }

	function unfocusSearch() {
		setSearchText('');
		Keyboard.dismiss();
		setFocused(false);
	}

	function search() {
		setSearchTrig(true);
	}

	function updateSearchTrig(val: boolean) {
		// console.log('upading search trig to ' + val);
		setSearchTrig(val);
	}

	function AllTab() {
		return (
			<SearchAll searchText={searchText} searchTrig={searchTrig} updateSearchTrig={updateSearchTrig} />
		)
	}

	function GolfersTab() {
		return (
			<SearchGolfers searchText={searchText} searchTrig={searchTrig} updateSearchTrig={updateSearchTrig} />
		)
	}

	function CoursesTab() {
		return (
			<SearchCourses searchText={searchText} searchTrig={searchTrig} updateSearchTrig={updateSearchTrig} initialCoordinates={initialCoordinates} />
		)
	}

	function TeeTimesTab() {
		return (
			<SearchTeeTimes searchText={searchText} searchTrig={searchTrig} updateSearchTrig={updateSearchTrig} />
		)
	}

    return (
        <SafeAreaView style={styles.container}>
			<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardAvoid}>
				<View style={styles.top}>
					<Input 
						placeholder="Search" placeholderTextColor={'black'}
						width="100%" py="3" px="1" fontSize="14" backgroundColor={'transparent'}
						borderColor={'black'} borderWidth={0.5} borderRadius="4"
						autoCorrect={false}
						returnKeyType='search'
						onFocus={() => setFocused(true)}
						onChangeText={(text) => setSearchText(text)}
						value={searchText}
						onSubmitEditing={search}
						InputLeftElement={
							<TouchableOpacity>
								<MaterialIcons style={{paddingLeft: 10,}} size={20} name="search" />
							</TouchableOpacity>
						} 
						InputRightElement={
							<View>
								{focused &&
									<TouchableOpacity onPress={unfocusSearch} style={styles.cancelButton}>
										<Text style={styles.cancelText}>Cancel</Text>
									</TouchableOpacity>
								}
							</View>
						} 
					/>

				</View>
				<TouchableWithoutFeedback onPress={unfocusSearch}>
					<View style={styles.content}>
						<ButtonToggleGroup
							highlightBackgroundColor={primary_color}
							highlightTextColor={white}
							inactiveBackgroundColor={'transparent'}
							inactiveTextColor={'grey'}
							values={['All', 'Golfers', 'Courses', 'Tee Times']}
							value={searchFilter}
							onSelect={val => setSearchFilter(val)}
							style={styles.optionBar}
							textStyle={styles.optionText}
						/>
						{/* <SearchOptionTab.Navigator
							screenOptions={{
								tabBarLabelStyle: {fontSize: 12, textTransform: 'none'},
								tabBarStyle: styles.optionBarStyle,
								tabBarIndicatorStyle: styles.optionIndicatorStyle

							}}
							
						>
							<SearchOptionTab.Screen name="All" component={AllTab} />
							<SearchOptionTab.Screen name="Golfers" component={GolfersTab} />
							<SearchOptionTab.Screen name="Courses" component={CoursesTab} />
							<SearchOptionTab.Screen name="Tee Times" component={TeeTimesTab} />
						</SearchOptionTab.Navigator> */}
					</View>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		</SafeAreaView>
    );
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	keyboardAvoid: {
		flex: 1,
	},
    top: {
		paddingTop: 10,
		paddingHorizontal: 10,
		marginHorizontal: 10,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	content: {
		flex: 1,
		marginHorizontal: 20,
	},
	cancelButton: {
		paddingRight: 10,
	},
	cancelText: {
		color: 'blue'
	},
	optionBarStyle: {
		marginTop: 5,
		borderRadius: 4,
		borderWidth: 0.5,
	},
	optionIndicatorStyle: {
		backgroundColor: 'powderblue', 
		height: '100%', 
		borderRadius: 4,
	},
	optionBar: {
		marginTop: 10,
		backgroundColor: white,
		borderRadius: 4,
		alignItems: 'center',
		justifyContent: 'center'
	},
	optionText: {
		fontSize: 11
	}
});
