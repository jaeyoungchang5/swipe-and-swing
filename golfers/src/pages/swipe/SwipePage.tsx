// external imports
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import CardStack, { Card } from 'react-native-card-stack-swiper';
import { SafeAreaView } from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';

// internal imports
import { AsyncLoad, City, Filters, SwipeItem, UploadButton } from '../../components';
import { demoMatches } from '../../demoData';
import { IMatch } from '../../interfaces';
import { fakeAPICall, getMatches } from '../../middleware';
import { white } from '../../options.json';

export function SwipePage({ route, navigation }: any) {
	const appUserId: number = route.params.appUserId;

	const [matches, setMatches] = useState<IMatch[]>();
	const [showAsync, setShowAsync] = useState<boolean>(false);
	let matchCounter = 0;

	useEffect(() => {
		loadSwipes();
	}, []);

	function loadSwipes() {
		getMatches(appUserId)
		.then(res => {
			setMatches(res);
			setShowAsync(false);
		})
	}

	/* swipe functionality */

	let swiperRef: any = null;

	function handleSwipeRight() {
		// API call to swipe right
		swiperRef.swipeRight();
	}

	function handleSwipeLeft() {
		// API call to swipe left
		swiperRef.swipeLeft();
	}

	function incrementCounter() {
		matchCounter += 1;
	}

	function swipedLeft() {
		incrementCounter();
		if (matches && matchCounter >= matches.length) {
			setShowAsync(true);
			loadSwipes();
		}
	}

	function swipedRight() {
		incrementCounter();
		if (matches && matchCounter >= matches.length) {
			setShowAsync(true);
			loadSwipes();
		}
	}

	

    return (
		<SafeAreaView style={styles.container}>
			<View style={styles.containerHome}>
				<View style={styles.top}>
					<City appUserId={appUserId} />
					<UploadButton appUserId={appUserId} navigation={navigation} />
					<Filters />
				</View>
				{(matches && !showAsync) ?
					<CardStack
						loop={false}
						verticalSwipe={false}
						renderNoMoreCards={() => null}
						ref={swiper => { swiperRef = swiper }}
					>
					{matches.map((item, index) => (
						<Card 
							onSwipedLeft={swipedLeft}
							onSwipedRight={swipedRight}
							key={index}
						>
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
				:
					<AsyncLoad />
				}
			</View>
		</SafeAreaView>
    );
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: white
	},
	containerHome: { 
		flex: 1,
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
