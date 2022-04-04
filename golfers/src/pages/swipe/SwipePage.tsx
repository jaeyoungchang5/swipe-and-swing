// external imports
import React, { useEffect, useRef, useState } from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import CardStack, { Card } from 'react-native-card-stack-swiper';
import { SafeAreaView } from 'react-native-safe-area-context';

// internal imports
import { City, Filters, SwipeItem, Upload } from '../../components';

const demoData = [
	{
		id: 1,
		name: 'Andy Rocks',
		caption: 'What is up',
		status: 'Online',
		match: '78',
		handicap: 19,
		transport: 'Carting',
		isDrinking: true,
		isBetting: true,
		num_holes: 18,
		num_people: 4,
		distance: 1.4,
		isMusic: true,
		image: require('../../../assets/Andy.jpg')
	},
	{
		id: 2,
		name: 'Timmy Gallagher',
		caption: 'Frick bro',
		status: 'Online',
		match: '98',
		handicap: 20,
		transport: 'Walking',
		isDrinking: false,
		isBetting: false,
		num_holes: 9,
		num_people: 2,
		distance: 3.1,
		isMusic: false,
		image: require('../../../assets/Timmy.jpg')
	},
	{
		id: 3,
		name: 'JaeYoung Chang',
		caption: 'Sup yo',
		status: 'Online',
		match: '80',
		handicap: 21,
		transport: 'Walking',
		isDrinking: true,
		isBetting: false,
		num_holes: 9,
		num_people: 4,
		distance: 3.1,
		isMusic: false,
		image: require('../../../assets/Jae.png')
	}
];

export function SwipePage() {
	let swiperRef: any = null;

	function handleSwipeRight() {
		swiperRef.swipeRight();
	}

	function handleSwipeLeft() {
		swiperRef.swipeLeft();
	}

    return (
		<ImageBackground
			source={require('../../../assets/bg.png')}
			style={styles.bg}
		>
		<SafeAreaView style={styles.container}>
        <View style={styles.containerHome}>
			<View style={styles.top}>
				<City />
				<Upload />
				<Filters />
			</View>

			<CardStack
				loop={false}
				verticalSwipe={false}
				renderNoMoreCards={() => null}
				ref={swiper => { swiperRef = swiper }}
			>
			{demoData.map((item, index) => (
				<Card key={index}>
				<SwipeItem
					image={item.image}
					name={item.name}
					caption={item.caption}
					match={item.match}
					handicap={item.handicap}
					transport={item.transport}
					isDrinking={item.isDrinking}
					isBetting={item.isBetting}
					num_holes={item.num_holes}
					num_people={item.num_people}
					distance={item.distance}
					isMusic={item.isMusic}
					onPressLeft={handleSwipeLeft}
					onPressRight={handleSwipeRight}
					actions={true}
					variant={false}
				/>
				</Card>
			))}
			</CardStack>
    	</View>
		</SafeAreaView>
		</ImageBackground>
    );
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	// CONTAINER - GENERAL
	bg: {
		flex: 1,
		resizeMode: "cover"
	},
	containerHome: { 
		marginHorizontal: 10,
	},
	top: {
		paddingTop: 10,
		marginHorizontal: 10,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center"
	},
});
