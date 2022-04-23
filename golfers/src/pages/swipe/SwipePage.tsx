// external imports
import React, { useEffect, useRef, useState } from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import CardStack, { Card } from 'react-native-card-stack-swiper';
import { SafeAreaView } from 'react-native-safe-area-context';

// internal imports
import { City, Filters, SwipeItem, Upload } from '../../components';
import { demoMatches } from '../../demoData';
import { IMatch } from '../../interfaces';

export function SwipePage() {
	const [matches, setMatches] = useState<IMatch[] | undefined>();

	useEffect(() => {
		setMatches(demoMatches);
	}, []);

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
			{matches &&
			
			<CardStack
				loop={false}
				verticalSwipe={false}
				renderNoMoreCards={() => null}
				ref={swiper => { swiperRef = swiper }}
			>
			{matches.map((item, index) => (
				<Card key={index}>
				<SwipeItem
					match_id={item.match_id}
					golfer_id={item.golfer_id}
					firstName={item.firstName}
					lastName={item.lastName}
					age={item.age}
					compatibility={item.compatibility}
					handicap={item.handicap}
					transport={item.transport}
					isDrinking={item.isDrinking}
					isBetting={item.isBetting}
					isMusic={item.isMusic}
					numHoles={item.numHoles}
					numPeople={item.numPeople}
					image={item.image}
					onPressLeft={handleSwipeLeft}
					onPressRight={handleSwipeRight}
					actions={true}
					variant={false}
				/>
				</Card>
			))}
			</CardStack>
			}
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
