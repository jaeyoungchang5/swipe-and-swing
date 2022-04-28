// external imports
import React, { useEffect, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { Input, Heading, VStack } from 'native-base';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// internal imports
import {
    dark_grey,
	grey,
	primary_color,
	alternate_color,
	white,
	like_actions,
	dislike_actions
} from '../../options.json';
import { SearchAll, SearchCourses, SearchGolfers, SearchTeeTimes } from '../../components';

export function SearchPage() {
	const [focused, setFocused] = useState<boolean>(false);
	const [searchText, setSearchText] = useState<string>('');
	const SearchOptionTab = createMaterialTopTabNavigator();

	function unfocusSearch() {
		setSearchText('');
		Keyboard.dismiss();
		setFocused(false);
	}

	function search() {
		// console.log(searchText);
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
						<SearchOptionTab.Navigator
							screenOptions={{
								tabBarLabelStyle: {fontSize: 12, textTransform: 'none'},
								tabBarStyle: styles.optionBarStyle,
								tabBarIndicatorStyle: styles.optionIndicatorStyle

							}}
							
						>
							<SearchOptionTab.Screen name="All" component={SearchAll} />
							<SearchOptionTab.Screen name="Golfers" component={SearchGolfers} />
							<SearchOptionTab.Screen name="Courses" component={SearchCourses} />
							<SearchOptionTab.Screen name="Tee Times" component={SearchTeeTimes} />
						</SearchOptionTab.Navigator>
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
	}
});
