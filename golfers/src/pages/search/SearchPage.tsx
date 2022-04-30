// external imports
import React, { useEffect, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { Input } from 'native-base';
import ButtonToggleGroup from 'react-native-button-toggle-group';

// internal imports
import { SearchAll, SearchCourses, SearchGolfers, SearchTeeTimes } from '../../components';
import { ICourse, IInitialCoordinates, IProfile } from '../../interfaces';
import { primary_color, white } from '../../options.json';
import { demoCourses, demoProfiles } from '../../demoData';
import { fakeAPICall } from '../../middleware';

export function SearchPage({route, navigation} : any) {
	const appUserId: number = route.params.appUserId;

	const [focused, setFocused] = useState<boolean>(false);
	const [searchText, setSearchText] = useState<string>('');
	const [searchTrig, setSearchTrig] = useState<boolean>(false);
	const [searchFilter, setSearchFilter] = useState<string>('Golfers');
    const [initialCoordinates, setInitialCoordinates] = useState<IInitialCoordinates>();

	// search result states
	const [golferResults, setGolferResults] = useState<IProfile[]>();
	const [courseResults, setCourseResults] = useState<ICourse[]>();


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
		Keyboard.dismiss();
		setFocused(false);
	}

	function cancelSearch() {
		setSearchText('');
		unfocusSearch();
	}

	function search() {
		setSearchTrig(true);

		if (searchFilter == 'All') {
			console.log('searching all for ' + searchText);
		} else if (searchFilter == 'Golfers') {
			console.log('searching golfers for ' + searchText);
			fakeAPICall()
			.then(() => {
				setGolferResults(demoProfiles);
			})
		} else if (searchFilter == 'Courses') {
			console.log('search courses for ' + searchText);
			fakeAPICall()
			.then(() => {
				setCourseResults(demoCourses);
			})
		}

	}

	function updateSearchTrig(val: boolean) {
		// console.log('upading search trig to ' + val);
		setSearchTrig(val);
	}

    return (
        <SafeAreaView style={styles.container}>
			<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardAvoid}>
				<View style={styles.top}>
					<Input 
						placeholder="Search" placeholderTextColor={'black'}
						width="100%" py="3" px="1" fontSize="14" backgroundColor={'transparent'}
						borderColor={'black'} borderWidth={0.5} borderRadius="4"
						style={styles.input}
						autoCorrect={false}
						returnKeyType='search'
						onFocus={() => {
							setFocused(true);
						}}
						onChangeText={(text) => setSearchText(text)}
						value={searchText}
						onSubmitEditing={search}
						InputLeftElement={
							<TouchableOpacity onPress={search}>
								<MaterialIcons style={{paddingLeft: 10,}} size={24} name="search" />
							</TouchableOpacity>
							// <TouchableOpacity style={styles.toggleView}>
							// 	<Entypo name="list" size={24} color="black" />
							// 	<Entypo name="map" size={18} color="black" />
							// </TouchableOpacity>
						} 
						InputRightElement={
							<View>
								{focused &&
									<TouchableOpacity onPress={cancelSearch} style={styles.cancelButton}>
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
							values={['Golfers', 'Courses', 'Tee Times']}
							value={searchFilter}
							onSelect={val => setSearchFilter(val)}
							style={styles.optionBar}
							textStyle={styles.optionText}
						/>
						{
							searchFilter == 'All' &&
							<SearchAll searchText={searchText} searchTrig={searchTrig} updateSearchTrig={updateSearchTrig} searchFilter={searchFilter} />
						}
						{
							searchFilter == 'Golfers' &&
							<SearchGolfers appUserId={appUserId} golferResults={golferResults} navigation={navigation} />
						}
						{
							searchFilter == 'Courses' &&
							<SearchCourses courseResults={courseResults} initialCoordinates={initialCoordinates} />
						}
						{
							searchFilter == 'Tee Times' &&
							<SearchTeeTimes searchText={searchText} searchTrig={searchTrig} updateSearchTrig={updateSearchTrig} />
						}
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
		color: '#3ea4c4'
	},
	optionBar: {
		marginTop: 10,
		backgroundColor: white,
		borderRadius: 4,
		borderWidth: 0.5
	},
	optionText: {
		fontSize: 13,
	},
	input: {
		// width: 
	}, 
	toggleView: {
		// flex: 1,
		paddingLeft: 10,
	}
});
