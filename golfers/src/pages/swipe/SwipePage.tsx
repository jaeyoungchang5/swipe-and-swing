// external imports
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import CardStack, { Card } from 'react-native-card-stack-swiper';
import { SafeAreaView } from 'react-native-safe-area-context';

// internal imports
import { AsyncLoad, City, Filters, SwipeItem, UploadButton } from '../../components';
import { demoMatches } from '../../demoData';
import { IMatch } from '../../interfaces';
import { fakeAPICall } from '../../middleware';

export function SwipePage({ route, navigation }: any) {
	const appUserId: number = route.params.appUserId;

	const [matches, setMatches] = useState<IMatch[]>();

	useEffect(() => {
		loadSwipes();
	}, []);

	function loadSwipes() {
		fakeAPICall()
		.then(() => {
			setMatches(demoMatches);
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

    return (
		<SafeAreaView style={styles.container}>
			<View style={styles.containerHome}>
				<View style={styles.top}>
					<City appUserId={appUserId} />
					<UploadButton appUserId={appUserId} navigation={navigation} />
					<Filters />
				</View>
				{matches ?
					<CardStack
						loop={false}
						verticalSwipe={false}
						renderNoMoreCards={() => { 
							return (
								<AsyncLoad />
							)
						}}
						// onSwipedAll={async () => {
						// 	return null
						// }}
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
