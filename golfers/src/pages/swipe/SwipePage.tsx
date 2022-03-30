// external imports
import React, { useEffect, useRef, useState } from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import CardStack, { Card } from 'react-native-card-stack-swiper';

// internal imports
import { City, Filters, SwipeItem, Upload } from '../../components';

const demoData = [
	{
		id: 1,
		name: 'Leanne Graham',
		status: 'Online',
		match: '78',
		description:
			'Full-time Traveller. Globe Trotter. Occasional Photographer. Part time Singer/Dancer.',
		message:
			'I will go back to Gotham and I will fight men Iike this but I will not become an executioner.',
		image: require('../../../assets/01.jpeg')
	},
	{
		id: 2,
		name: 'Clementine Bauch',
		match: '93',
		description:
			'Full-time Traveller. Globe Trotter. Occasional Photographer. Part time Singer/Dancer.',
		status: 'Offline',
		message: "Someone like you. Someone who'll rattle the cages.",
		image: require('../../../assets/02.jpeg')
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
					description={item.description}
					matches={item.match}
					actions
					onPressLeft={handleSwipeLeft}
					onPressRight={handleSwipeRight}
				/>
				</Card>
			))}
			</CardStack>
    	</View>
		</ImageBackground>
    );
}

const styles = StyleSheet.create({
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
